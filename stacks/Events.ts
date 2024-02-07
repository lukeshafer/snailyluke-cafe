import { type StackContext, EventBus, use } from 'sst/constructs';
import { Database } from './Database';

export function Events({ stack }: StackContext) {
	const { table } = use(Database);

	const bus = new EventBus(stack, 'bus', {
		defaults: {
			retries: 10,
		},
	});
	bus.subscribe('drink.ordered', {
		handler: 'packages/functions/src/events/drink-ordered.handler',
		bind: [table],
	});

	return { bus };
}
