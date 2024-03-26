import { useLocation } from "@solidjs/router";
import {
	For,
	createSignal,
	type ParentProps,
	type JSX,
	createEffect,
} from "solid-js";
import { isServer } from "solid-js/web";
import { Slider, Tabs } from "@kobalte/core";

export default function CreateASnail() {
	return (
		<main class="p-4">
			<h1 class="text-2xl font-bold text-gray-800 text-center">
				Create-A-Snail
			</h1>
			<SnailForm />
		</main>
	);
}

const bodies = [
	{
		name: "Round",
		id: "round",
		src: "round.png",
		alt: "Round-shaped body",
		eyeX: "210%",
		eyeY: "50%",
		mouthX: "475%",
		mouthY: "340%",
	},
	{
		name: "Chunky",
		id: "chunky",
		src: "chunky.png",
		alt: "Big chunky body",
		eyeX: "205%",
		eyeY: "25%",
		mouthX: "470%",
		mouthY: "280%",
	},
	{
		name: "Short body",
		id: "short",
		src: "short.png",
		alt: "Short body",
		eyeX: "210%",
		eyeY: "110%",
		mouthX: "475%",
		mouthY: "500%",
	},
	{
		name: "Tall body",
		id: "tall",
		src: "tall.png",
		alt: "Tall body",
		eyeX: "210%",
		eyeY: "0%",
		mouthX: "475%",
		mouthY: "200%",
	},
	{
		name: "Small body",
		id: "small",
		src: "small.png",
		alt: "Small body",
		eyeX: "210%",
		eyeY: "90%",
		mouthX: "475%",
		mouthY: "440%",
	},
] satisfies Array<Body>;

const eyes = [
	{
		name: "Default",
		id: "default",
		src: "default.png",
		alt: "Eyes with no particular expression",
	},
	{
		name: "Angry",
		id: "angry",
		src: "angry.png",
		alt: "Eyes with angry eyebrows",
	},
	{
		name: "Sad",
		id: "sad",
		src: "sad.png",
		alt: "Eyes with sad eyebrows",
	},
	{
		name: "Happy",
		id: "happy",
		src: "happy.png",
		alt: "Eyes closed with a happy expression",
	},
	{
		name: "Far",
		id: "far",
		src: "far.png",
		alt: "Eyes with no particular expression, spread far apart from each other",
	},
	{
		name: "Glistening",
		id: "glistening",
		src: "glistening.png",
		alt: "Glistening eyes",
	},
];

const mouths = [
	{
		name: "Smile",
		id: "smile",
		src: "smile.png",
		alt: "Smiling mouth",
	},
	{
		name: "Frown",
		id: "frown",
		src: "frown.png",
		alt: "Frowning mouth",
	},
	{
		name: "Neutral",
		id: "neutral",
		src: "neutral.png",
		alt: "Neutral mouth",
	},
	{
		name: "Joy",
		id: "joy",
		src: "joy.png",
		alt: "Open smiling mouth",
	},
	{
		name: "Agape",
		id: "agape",
		src: "agape.png",
		alt: "Open neutral mouth",
	},
	{
		name: "None",
		id: "none",
		src: "none.png",
		alt: "No mouth",
	},
];

interface Body extends SnailPart {
	eyeX: string;
	eyeY: string;
	mouthX: string;
	mouthY: string;
}

interface SnailPart {
	name: string;
	id: string;
	src: string;
	alt: string;
}

function SnailForm() {
	const pathPrefix = "create-a-snail-assets";

	const searchParams = isServer
		? new URLSearchParams(useLocation().search)
		: new URL(window.location.href).searchParams;
	const defaultBody =
		bodies.find((b) => b.id === searchParams.get("body")) ?? bodies[0];
	const defaultEyes =
		eyes.find((e) => e.id === searchParams.get("eyes")) ?? eyes[0];
	const defaultMouth =
		mouths.find((m) => m.id === searchParams.get("mouth")) ?? mouths[0];

	const [selectedBody, setSelectedBody] = createSignal<Body>(defaultBody);
	const [selectedEyes, setSelectedEyes] = createSignal<SnailPart>(defaultEyes);
	const [selectedMouth, setSelectedMouth] =
		createSignal<SnailPart>(defaultMouth);
	const [hue, setHue] = createSignal<string>("180deg");
	const [saturation, setSaturation] = createSignal<number>(3);
	const [brightness, setBrightness] = createSignal<string>("1");

	createEffect(() => {
		const url = new URL(window.location.href);
		url.searchParams.set("body", selectedBody().id);
		url.searchParams.set("eyes", selectedEyes().id);
		url.searchParams.set("mouth", selectedMouth().id);
		window.history.replaceState({}, "", url.toString());
	});

	return (
		<form
			style={{
				"--hue": hue(),
				"--saturation": String(saturation() + 1.5),
				"--brightness": brightness(),
			}}
		>
			<div class="w-60 h-60 bg-gray-200 grid place-items-center mx-auto">
				<figure
					class="relative w-[200px] h-[200px]"
					style={{
						filter:
							"contrast(0.8) sepia(0.5) hue-rotate(var(--hue, 180deg)) saturate(var(--saturation, 3)) brightness(var(--brightness, 1))",
					}}
				>
					<img
						width="200"
						src={`${pathPrefix}/01-body/${selectedBody().src}`}
						class="absolute"
					/>
					<img
						width="60"
						src={`${pathPrefix}/02-eyes/${selectedEyes().src}`}
						class="absolute inset-0"
						style={{
							"--x": selectedBody().eyeX,
							"--y": selectedBody().eyeY,
							transform: `translate3d(var(--x), var(--y), 0)`,
						}}
					/>
					<img
						width="30"
						src={`${pathPrefix}/03-mouth/${selectedMouth().src}`}
						class="absolute inset-0"
						style={{
							"--x": selectedBody().mouthX,
							"--y": selectedBody().mouthY,
							transform: `translate3d(var(--x), var(--y), 0)`,
						}}
					/>
				</figure>
			</div>

			<Tabs.Root>
				<Tabs.List>
					<Tabs.Trigger value="body">Body</Tabs.Trigger>
					<Tabs.Trigger value="eyes">Eyes</Tabs.Trigger>
					<Tabs.Trigger value="mouth">Mouth</Tabs.Trigger>
					<Tabs.Trigger value="colors">Colors</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="body">
					<Fieldset>
						<legend class="p-2">Body</legend>
						<For each={bodies}>
							{(body) => (
								<Label checked={String(selectedBody().id === body.id)}>
									<img
										width="200"
										src={`${pathPrefix}/01-body/${body.src}`}
										alt={body.alt}
									/>
									<span class="sr-only">{body.name}</span>
									<input
										class="sr-only"
										type="radio"
										name="body"
										value={body.id}
										onChange={() => setSelectedBody(body)}
										checked={selectedBody().id === body.id}
									/>
								</Label>
							)}
						</For>
					</Fieldset>
				</Tabs.Content>
				<Tabs.Content value="eyes">
					<Fieldset>
						<legend class="p-2">Eyes</legend>
						<For each={eyes}>
							{(eye) => (
								<Label checked={String(selectedEyes().id === eye.id)}>
									<img
										width="100"
										src={`${pathPrefix}/02-eyes/${eye.src}`}
										alt={eye.alt}
									/>
									<span class="sr-only">{eye.name}</span>
									<input
										class="sr-only"
										type="radio"
										name="eye"
										value={eye.id}
										onChange={() => setSelectedEyes(eye)}
										checked={selectedEyes().id === eye.id}
									/>
								</Label>
							)}
						</For>
					</Fieldset>
				</Tabs.Content>
				<Tabs.Content value="mouth">
					<Fieldset>
						<legend class="p-2">Mouth</legend>
						<For each={mouths}>
							{(mouth) => (
								<Label checked={String(selectedMouth().id === mouth.id)}>
									<img
										width="100"
										src={`${pathPrefix}/03-mouth/${mouth.src}`}
										alt={mouth.alt}
									/>
									<span class="sr-only">{mouth.name}</span>
									<input
										class="sr-only"
										type="radio"
										name="mouth"
										value={mouth.id}
										onChange={() => setSelectedMouth(mouth)}
										checked={selectedMouth().id === mouth.id}
									/>
								</Label>
							)}
						</For>
					</Fieldset>
				</Tabs.Content>
				<Tabs.Content value="colors">
					<HueSlider setHue={setHue} />
					<SaturationSlider setSaturation={setSaturation} />
					<BrightnessSlider setBrightness={setBrightness} />
				</Tabs.Content>
			</Tabs.Root>
		</form>
	);
}

function Fieldset(props: ParentProps) {
	return (
		<fieldset class="grid grid-cols-3 max-w-xl mx-auto p-8 border-2 border-black/50 focus-within:bg-gray-100">
			{props.children}
		</fieldset>
	);
}

function Label(
	props: Omit<JSX.HTMLAttributes<HTMLLabelElement>, "class"> & {
		checked: string;
	},
) {
	return (
		<label
			{...props}
			data-checked={props.checked}
			class="p-2 grid place-items-center gap-2 data-[checked=true]:bg-emerald-200 focus-within:outline focus-within:outline-4 focus-within:outline-emerald-950"
		/>
	);
}

function HueSlider(props: {
	setHue: (value: string) => void;
}) {
	const colors = [
		"hsl(39, 41%, 65%)",
		"hsl(71, 31%, 61%)",
		"hsl(106, 33%, 65%)",
		"hsl(143, 36%, 64%)",
		"hsl(197, 46%, 68%)",
		"hsl(219, 58%, 75%)",
		"hsl(251, 59%, 80%)",
		"hsl(286, 50%, 77%)",
		"hsl(324, 56%, 77%)",
		"hsl(350, 62%, 78%)",
		"hsl(17, 56%, 73%)",
		"hsl(39, 41%, 65%)",
	];

	return (
		<Slider.Root
			class="relative flex flex-col items-center select-none touch-none w-52"
			onChange={([value]) => {
				props.setHue(`${value}deg`);
			}}
			name="hue"
			minValue={0}
			maxValue={360}
			defaultValue={[180]}
		>
			<Slider.Label class="w-full text-center">Hue</Slider.Label>
			<Slider.Track
				class="bg-gray-400 relative rounded-full h-2 w-full flex"
				style={{
					"background-image": `linear-gradient(to right, ${colors.join(", ")})`,
				}}
			>
				<Slider.Thumb
					class="block w-4 h-4 rounded-full -top-1 bg-neutral-300 hover:shadow hover:shadow-neutral-500/50 outline outline-1 focus:outline-2 outline-neutral-500 focus:shadow focus:shadow-neutral-500"
					style={{
						filter:
							"sepia(0.5) hue-rotate(var(--hue, 180deg)) saturate(3) brightness(1)",
					}}
				>
					<Slider.Input />
				</Slider.Thumb>
			</Slider.Track>
		</Slider.Root>
	);
}

function SaturationSlider(props: {
	setSaturation: (value: number) => void;
}) {
	return (
		<Slider.Root
			class="relative flex flex-col items-center select-none touch-none w-52"
			onChange={([value]) => props.setSaturation(value)}
			name="saturation"
			minValue={0}
			maxValue={3}
			defaultValue={[1.5]}
			step={0.1}
		>
			<Slider.Label class="w-full text-center">Saturation</Slider.Label>
			<Slider.Track
				class="bg-gray-400 relative rounded-full h-2 w-full flex"
				style={{
					filter:
						"sepia(0.5) hue-rotate(var(--hue, 180deg)) saturate(var(--saturation)) brightness(1)",
				}}
			>
				<Slider.Thumb class="block w-4 h-4 rounded-full -top-1 bg-neutral-300 hover:shadow hover:shadow-neutral-500/50 outline outline-1 focus:outline-2 outline-neutral-500 focus:shadow focus:shadow-neutral-500">
					<Slider.Input />
				</Slider.Thumb>
			</Slider.Track>
		</Slider.Root>
	);
}

function BrightnessSlider(props: {
	setBrightness: (value: number) => void;
}) {
	return (
		<Slider.Root
			class="relative flex flex-col items-center select-none touch-none w-52"
			onChange={([value]) => props.setBrightness(value)}
			name="brightness"
			minValue={0.8}
			maxValue={1.4}
			defaultValue={[1]}
			step={0.01}
		>
			<Slider.Label class="w-full text-center">Brightness</Slider.Label>
			<Slider.Track
				class="bg-gray-400 relative rounded-full h-2 w-full flex"
				style={{
					filter:
						"sepia(0.5) \
              hue-rotate(var(--hue, 180deg)) \
              saturate(1.5) \
              brightness(var(--brightness))",
				}}
			>
				<Slider.Thumb class="block w-4 h-4 rounded-full -top-1 bg-neutral-300 hover:shadow hover:shadow-neutral-500/50 outline outline-1 focus:outline-2 outline-neutral-500 focus:shadow focus:shadow-neutral-500">
					<Slider.Input />
				</Slider.Thumb>
			</Slider.Track>
		</Slider.Root>
	);
}
