import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { drinks } from "@snailyluke-cafe/core/data";
import menu from "@snailyluke-cafe/core/menu.json";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const userString = event.headers["nightbot-user"];
	const drinkName = event.pathParameters?.drinkname;
	//console.log({ headers: event.headers, body: event.body, event });

	if (!userString) {
		console.log("no userstring", event.headers);
		return {
			statusCode: 400,
			body: "Invalid input",
		};
	}

	const params = new URLSearchParams(userString);

	const username = params.get("name");
	const displayName = params.get("displayName");
	const provider = params.get("provider");
	const providerId = params.get("providerId");

	if (provider !== "twitch" && providerId !== "1175491") {
		console.log("bad provider", params);
		return {
			statusCode: 400,
			body: "Invalid input",
		};
	}

	if (!displayName || !username) {
		console.log("bad username/displayname", params);
		return {
			statusCode: 400,
			body: "Invalid input",
		};
	}

	if (!drinkName)
		return "Make sure to include a drink in your order! To see the menu, use !menu";

	const menuItem = menu.find((menuItem) =>
		drinkName.toLowerCase().includes(menuItem.name.toLowerCase()),
	);

	if (!menuItem) return "Please order a drink from the !menu";

	await drinks.delete({ username }).go();

	const result = await drinks
		.upsert({
			username,
			displayName,
			drinkName: menuItem.name,
			fileName: menuItem.file,
		})
		.go();
	//console.log(result);

	return `Okay ${displayName}, you ordered ${menuItem.name}`;
};
