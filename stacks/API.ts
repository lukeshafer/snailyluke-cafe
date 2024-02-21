import { StackContext, Api, use } from 'sst/constructs';
import { Events } from './Events';
import { Database } from './Database';

export function API({ stack }: StackContext) {
	const { bus } = use(Events);
	const { table } = use(Database);

	const api = new Api(stack, 'api', {
		defaults: {
			function: {
				bind: [bus, table],
			},
		},
		routes: {
			'GET /drink/{drinkname}': 'packages/functions/src/api/order-drink.handler',
			'GET /drinks': 'packages/functions/src/api/drinks.handler',
			'GET /menu': 'packages/functions/src/api/menu.handler',
      'PATCH /drink/{drinkname}': 'packages/functions/src/api/update-drink.handler',
		},
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
	});

	return { api };
}
