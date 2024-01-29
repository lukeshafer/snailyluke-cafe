import { StackContext, Api, EventBus, Table } from "sst/constructs";

export function API({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const table = new Table(stack, "data", {
    fields: {
      pk: 'string',
      sk: 'string',
      gsi1pk: 'string',
      gsi1sk: 'string',
    },
    primaryIndex: {
      partitionKey: 'pk',
      sortKey: 'sk',
    },
    globalIndexes: {
      gsi1: {
        partitionKey: 'gsi1pk',
        sortKey: 'gsi1sk',
      },
    },

  })

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus, table],
      },
    },
    routes: {
      "GET /drink/{drinkname}": "packages/functions/src/api/order-drink.handler",
      "GET /drinks": "packages/functions/src/api/drinks.handler"
    },
  });

  bus.subscribe("drink.ordered", {
    handler: "packages/functions/src/events/drink-ordered.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
