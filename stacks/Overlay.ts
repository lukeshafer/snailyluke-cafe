import { StackContext, StaticSite, use } from 'sst/constructs';
import { API } from './API';

export function Overlay({ stack }: StackContext) {
	const { api } = use(API);

	const overlay = new StaticSite(stack, 'overlay', {
		path: 'packages/overlay',
		buildCommand: 'pnpm run build',
		buildOutput: 'dist',
		environment: {
			VITE_APP_API_URL: api.url,
		},
	});

	stack.addOutputs({
		OverlayUrl: overlay.url,
	});
}
