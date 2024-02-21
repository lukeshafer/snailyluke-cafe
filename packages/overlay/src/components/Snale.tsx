import { Show, createSignal, onMount } from 'solid-js';
import Drink from './Drink';

export default function Snale(props: {
	drink?: { drinkName: string; fileName: string; username: string };
}) {
	const [x, setX] = createSignal(0);
	const [isMoving, setIsMoving] = createSignal(false);

	let prevT = 0;
	const SPEED = 0.02;
	const MAX_X = 300;
	function step(time = 0) {
		const dx = (time - prevT) * SPEED;
		setX(x => x + dx);

		prevT = time;

		if (x() < MAX_X) {
			window.requestAnimationFrame(step);
		} else {
			setX(MAX_X);
			fetch(
				import.meta.env.VITE_APP_API_URL +
					`/drink/${props.drink?.drinkName}?username=${props.drink?.username}`,
				{
					method: 'PATCH',
				}
			);
			// set drink as served
			// walk off screen
			// bring the next one
			setIsMoving(false);
		}
	}

	onMount(() => {
		setIsMoving(true);
		step();
	});

	return (
		<div class="absolute bottom-24 left-0 w-40 translate-x-[--x]" style={{ '--x': x() + '%' }}>
			<img
				src="snale.PNG"
				class="absolute bottom-0 left-0 w-full"
				style={{ opacity: isMoving() ? 0 : 1 }}
			/>
			<img
				src="snale.gif"
				class="absolute bottom-0 left-0 w-full"
				style={{ opacity: isMoving() ? 1 : 0 }}
			/>
			<Show when={props.drink}>
				{drink => (
					<>
						<div class="absolute -right-1/3 bottom-0">
							<Drink {...drink()} />
						</div>
						<img class="absolute left-[2%] bottom-0 w-full" src="arm.PNG" />
					</>
				)}
			</Show>
		</div>
	);
}
