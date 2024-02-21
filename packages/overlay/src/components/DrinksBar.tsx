import { For } from 'solid-js';
import Drink, { DrinkType } from './Drink';

export default function DrinksBar(props: { drinks: Array<DrinkType> }) {
	return (
		<ul class="absolute bottom-0 left-0 w-screen bg-gray-800">
			<For each={props.drinks}>
				{drink => (
					<li>
						<Drink {...drink} />
					</li>
				)}
			</For>
		</ul>
	);
}
