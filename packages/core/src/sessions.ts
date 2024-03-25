import { createSessionBuilder } from "sst/dist/auth";

export const sessions = createSessionBuilder<{
	user: {
		userId: string;
		username: string;
		version: number;
	};
}>();
