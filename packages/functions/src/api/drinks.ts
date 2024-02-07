import { drinks } from '@snailyluke-cafe/core/drinks';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler = (async event => {
  const allDrinks = await drinks.scan.go({ pages: 'all' });

  const today = new Date().toDateString();

  console.log(event)

  const todaysDrinks = allDrinks.data.filter(drink => {
    const orderDate = new Date(drink.orderedAt ?? 0).toDateString();
    return orderDate === today;
  });

  switch (event.headers['accept']) {
    case 'application/json':
      return JSON.stringify(
        todaysDrinks.map(drink => ({
          username: drink.displayName,
          drinkName: drink.drinkName,
          fileName: drink.fileName,
        }))
      );
    default:
      return todaysDrinks
        .map(drink => `${drink.displayName} is drinking ${drink.drinkName}`)
        .join(', ');
  }
}) satisfies APIGatewayProxyHandlerV2;
