import { drinks } from '@snailyluke-cafe/core/drinks';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler = (async event => {
	const allDrinks = await drinks.scan.go({ pages: 'all' });

	switch (event.headers['accept']) {
		case 'application/json':
			return JSON.stringify(
				allDrinks.data.map(drink => ({
					username: drink.username,
					drinkName: drink.drinkName,
				}))
			);
		default:
			return allDrinks.data
				.map(drink => `${drink.displayName} is drinking ${drink.drinkName}`)
				.join(', ');
	}
}) satisfies APIGatewayProxyHandlerV2;
