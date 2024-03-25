import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import menu from "@snailyluke-cafe/core/menu.json";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	switch (event.headers["accept"]) {
		case "application/json":
			return JSON.stringify(menu);
		default:
			return `Today's menu: ${menu.map((item) => item.name).join(", ")}`;
	}
};
