import { randomUUID } from 'crypto';
import { Entity, EntityItem, type EntityConfiguration } from 'electrodb';
import { Table } from 'sst/node/table';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export type Drink = EntityItem<typeof drinks>;

export const config = {
  table: Table.database.tableName,
  client: new DynamoDBClient(),
} satisfies EntityConfiguration;

export const drinks = new Entity(
  {
    model: {
      entity: 'drink',
      service: 'snailyluke-cafe',
      version: '1',
    },
    attributes: {
      username: {
        type: 'string',
        required: true,
      },
      displayName: {
        type: 'string',
        required: true,
      },
      drinkName: {
        type: 'string',
        required: true,
      },
      fileName: {
        type: 'string',
        required: true,
      },
      isServed: {
        type: 'boolean'
      },
      orderedAt: {
        type: 'number',
        default: () => Date.now(),
        // cannot be modified after created
        readOnly: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: 'pk',
          composite: ['username'],
        },
        sk: {
          field: 'sk',
          composite: [],
        },
      },
    },
  },
  config
);
