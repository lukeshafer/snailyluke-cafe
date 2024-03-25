/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app() {
		return {
			name: "snailyluke-cafe",
			home: "aws",
			providers: {
				aws: {
					region: "us-east-2",
				},
			},
		};
	},
	async run() {
		//new sst.aws.Bucket("MyBucket");
		//
		//old stack:
		//  Database > Event > API > Overlay

		const cafeDatabase = new sst.aws.Dynamo("CafeDatabase", {
			fields: {
				pk: "string",
				sk: "string",
				gsi1pk: "string",
				gsi1sk: "string",
			},
			primaryIndex: {
				hashKey: "pk",
				rangeKey: "sk",
			},
			globalIndexes: {
				gsi1: {
					hashKey: "gsi1pk",
					rangeKey: "gsi1sk",
				},
			},
		});

		// TODO: add event bus based on the below code
		// const bus = new sst.aws.EventBus("EventBus", {
		//  defaults: {
		//    retries: 10,
		//  },
		// });
		//  bus.subscribe('drink.ordered', {
		//    handler: 'packages/functions/src/events/drink-ordered.handler',
		//    bind: [table],
		//  });

		const api = new sst.aws.ApiGatewayV2("CafeAPI")
			.route("GET /drink/{drinkname}", {
				handler: "packages/functions/src/api/order-drink.handler",
				link: [cafeDatabase],
			})
			.route("GET /drinks", {
				handler: "packages/functions/src/api/drinks.handler",
				link: [cafeDatabase],
			})
			.route("GET /menu", {
				handler: "packages/functions/src/api/menu.handler",
			})
			.route("PATCH /drink/{drinkname}", {
				handler: "packages/functions/src/api/update-drink.handler",
				link: [cafeDatabase],
			});

		const overlay = new sst.aws.StaticSite("CafeOverlay", {
			path: "packages/overlay",
			build: {
				command: "pnpm run build",
				output: "dist",
			},
			environment: {
				VITE_APP_API_URL: api.url,
			},
		});

		const domainName =
			$app.stage === "prod"
				? "cafe.snailyluke.com"
				: `${$app.stage}.env.snailyluke.com`;
		const hostedZone = "snailyluke.com";

		const twitchClientId = new sst.Secret("TwitchClientId");
		const twitchClientSecret = new sst.Secret("TwitchClientSecret");

		const auth = new sst.aws.Auth("SiteAuth", {
			authenticator: {
				handler: "packages/functions/src/auth.handler",
				environment: {
					DOMAIN_NAME: domainName,
				},
				link: [cafeDatabase, twitchClientId, twitchClientSecret],
			},
		});

		const site = new sst.aws.SolidStart("CafeSite", {
			path: "packages/site",
			environment: {
				DOMAIN_NAME: domainName,
			},
			//domain: { domainName, hostedZone },
			link: [cafeDatabase],
		});

		return {
			SiteAuthUrl: auth.url,
			OverlayUrl: overlay.url,
			CafeSiteUrl: site.url,
		};
	},
});
