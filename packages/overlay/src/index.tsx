/* @refresh reload */
import { render } from 'solid-js/web';
import { For, createResource, onCleanup, onMount } from 'solid-js';

import './index.css';
import Drink from './components/Drink';

function Index() {
	const [drinks, { refetch }] = createResource(async () => {
		const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/drinks`, {
			headers: {
				accept: 'application/json',
			},
		});

		const drinks = await res.json();
		return drinks as { username: string; drinkName: string; fileName: string }[];
	});

	let interval: number;
	onMount(() => {
		interval = setInterval(refetch, 1000);
	});
	onCleanup(() => {
		clearInterval(interval);
	});

	return (
		<ul>
			<For each={drinks()}>{drink => <Drink {...drink} />}</For>
		</ul>
	);
}

const root = document.getElementById('root');
render(() => <Index />, root!);
