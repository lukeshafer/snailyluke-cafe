import { SSTConfig } from 'sst';
import { API } from './stacks/API';
import { Database } from './stacks/Database';
import { Events } from './stacks/Events';
import { Overlay } from './stacks/Overlay';

export default {
	config(_input) {
		return {
			name: 'snailyluke-cafe',
			region: 'us-east-2',
		};
	},
	stacks(app) {
		app.stack(Database).stack(Events).stack(API).stack(Overlay);
	},
} satisfies SSTConfig;
