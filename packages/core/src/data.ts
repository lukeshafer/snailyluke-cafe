import { randomUUID } from "crypto";
import { Entity, EntityItem, type EntityConfiguration } from "electrodb";
import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export type Drink = EntityItem<typeof drinks>;

export const config = {
	table: Resource.CafeDatabase.name,
	client: new DynamoDBClient(),
} satisfies EntityConfiguration;

export const drinks = new Entity(
	{
		model: {
			entity: "drink",
			service: "snailyluke-cafe",
			version: "1",
		},
		attributes: {
			username: {
				type: "string",
				required: true,
			},
			displayName: {
				type: "string",
				required: true,
			},
			drinkName: {
				type: "string",
				required: true,
			},
			fileName: {
				type: "string",
				required: true,
			},
			isServed: {
				type: "boolean",
			},
			orderedAt: {
				type: "number",
				default: () => Date.now(),
				// cannot be modified after created
				readOnly: true,
			},
		},
		indexes: {
			primary: {
				pk: {
					field: "pk",
					composite: ["username"],
				},
				sk: {
					field: "sk",
					composite: [],
				},
			},
		},
	},
	config,
);

export const users = new Entity(
	{
		model: {
			entity: "drink",
			service: "snailyluke-cafe",
			version: "1",
		},
		attributes: {
			uuid: {
				type: "string",
				default: () => randomUUID(),
			},
			userId: {
				type: "string",
				required: true,
			},
			username: {
				type: "string",
				required: true,
			},
			displayName: {
				type: "string",
				required: true,
			},
			createdAt: {
				type: "number",
				default: () => Date.now(),
				// cannot be modified after created
				readOnly: true,
			},
			updatedAt: {
				type: "number",
				// watch for changes to any attribute
				watch: "*",
				// set current timestamp when updated
				set: (_, i) => {
					// add to audit log
					return Date.now();
				},
				readOnly: true,
			},
		},
		indexes: {
			primary: {
				pk: {
					field: "pk",
					composite: ["username"],
				},
				sk: {
					field: "sk",
					composite: [],
				},
			},
		},
	},
	config,
);
