import './App.css';
import { For, createResource } from 'solid-js';

function App() {
	const [drinks] = createResource(async () => {
		const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/drinks`, {
			headers: {
				accept: 'application/json',
			},
		});

		const drinks = await res.json();
		return drinks as { username: string; drinkName: string }[];
	});

	//let interval: number;
	//onMount(() => {
	//interval = setInterval(refetch, 1000);
	//});
	//onCleanup(() => {
	//clearInterval(interval);
	//});

	return (
		<ul>
			<For each={drinks()}>
				{drink => (
					<li>
						{drink.username} is drinking {drink.drinkName}
					</li>
				)}
			</For>
		</ul>
	);
}

export default App;
