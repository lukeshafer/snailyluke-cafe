import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { drinks } from "@snailyluke-cafe/core/data";
import menu from "@snailyluke-cafe/core/menu.json";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const params = new URLSearchParams(event.rawQueryString);

	const username = params.get("username");
	if (!username)
		return {
			statusCode: 404,
		};

	console.log({ params });
	const result = await drinks.patch({ username }).set({ isServed: true }).go();
	console.log({ result });

	return {
		statusCode: 200,
		body: "yay!",
	};
};
