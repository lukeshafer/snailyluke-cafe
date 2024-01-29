import { drinks } from '@snailyluke-cafe/core/drinks';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async event => {
	const allDrinks = await drinks.scan.go({ pages: 'all' });

	console.log({ allDrinks });

	return allDrinks.data
		.map(drink => `${drink.displayName} is drinking ${drink.drinkName}`)
		.join(', ');
};
