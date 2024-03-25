import { Resource } from "sst";
import { AuthHandler, Issuer, OauthAdapter } from "sst/dist/auth";
import { sessions } from "@snailyluke-cafe/core/sessions";

export const handler = AuthHandler({
	session: sessions,
	providers: {
		twitchUser: OauthAdapter({
			issuer: await Issuer.discover("https://id.twitch.tv/oauth2"),
			clientID: Resource.TwitchClientId.value,
			clientSecret: Resource.TwitchClientSecret.value,
			scope: "openid",
		}),
	},
	callbacks: {
		connect: {
			async start() {
				console.log("start");
			},
			async error() {
				console.log("error");
				return undefined;
			},
		},
		async error(err) {
			console.error("callbacks.error", { err });
			return undefined;
		},
		auth: {
			async allowClient(clientID, redirect, req) {
				switch (clientID) {
					case "local":
						return true;
					case "main":
						return redirect.startsWith(`https://${process.env.DOMAIN_NAME}`);
					default:
						return false;
				}
			},
			async success(input, response, request) {
				switch (response.provider) {
					case "twitchUser": {
						const claims = response.tokenset.claims();
						const session = await input.session();
					}
				}
			},
		},
	},
});
