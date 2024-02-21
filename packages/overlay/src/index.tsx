/* @refresh reload */
import { render } from 'solid-js/web';
import { For, createEffect, createMemo, createResource, onCleanup, onMount } from 'solid-js';

import './index.css';
import Drink from './components/Drink';
import Snale from './components/Snale';

type Drink = { username: string; drinkName: string; fileName: string; isServed: boolean };

function Index() {
	const [drinks, { refetch }] = createResource(async () => {
		const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/drinks`, {
			headers: {
				accept: 'application/json',
			},
		});

		const drinks = await res.json();
    console.log(drinks)
		return drinks as Array<Drink>;
	});

	const servedDrinks = () => drinks()?.filter(d => d.isServed) ?? [];
	const currentDrink = createMemo(() => drinks()?.find(d => !d.isServed));

	let interval: number;
	onMount(() => {
    //interval = setInterval(refetch, 10000);
	});
	onCleanup(() => {
		clearInterval(interval);
	});

	return (
		<div class="w-screen h-screen relative">
			<button
				class="text-3xl p-4 text-white bg-emerald-800"
				onClick={() => {
					fetch(import.meta.env.VITE_APP_API_URL + `/drink/Coffee?username=snailyluke`, {
						method: 'PATCH',
					});
				}}>
				CLICK ME
			</button>
			<ul class="">
				<Snale drink={currentDrink()} />
				{/*<DrinksBar drinks={drinks() ?? []} />*/}
				{/*<For each={drinks()}>{drink => <Drink {...drink} />}</For>*/}
			</ul>
		</div>
	);
}

const root = document.getElementById('root');
render(() => <Index />, root!);
