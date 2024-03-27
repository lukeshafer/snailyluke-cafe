import { For, type ParentProps, type JSX } from "solid-js";
import { Slider, Tabs } from "@kobalte/core";
import SnailPreview from "~/components/SnailPreview";
import { bodies, eyes, mouths } from "~/snail-data";
import { createUrlStore } from "~/lib";
import { SNAIL_ASSETS } from "~/constants";

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

function SnailForm() {
	const pathPrefix = "create-a-snail-assets";

	const [state, setState] = createUrlStore({
		body: bodies[0].id,
		eyes: eyes[0].id,
		mouth: mouths[0].id,
		bodyHue: "180deg",
		bodySat: "3",
		bodyBri: "1",
		shellHue: "180deg",
		shellSat: "3",
		shellBri: "1",
	});

	const selectedBody = () => bodies.find((b) => b.id === state.body)!;
	const selectedEyes = () => eyes.find((b) => b.id === state.eyes)!;
	const selectedMouth = () => mouths.find((b) => b.id === state.mouth)!;

	return (
		<form>
			<SnailPreview
				body={selectedBody().src}
				eyes={selectedEyes().src}
				mouth={selectedMouth().src}
				bodyColors={{
					hue: state.bodyHue,
					saturation: state.bodySat,
					brightness: state.bodyBri,
				}}
				shellColors={{
					hue: state.shellHue,
					saturation: state.shellSat,
					brightness: state.shellBri,
				}}
				faceX={selectedBody().faceX}
				faceY={selectedBody().faceY}
				scale={selectedBody().scale}
			/>

			<Tabs.Root class="max-w-xl mx-auto">
				<Tabs.List class="relative">
					<Tabs.Trigger class="px-4 py-2" value="body">
						Body
					</Tabs.Trigger>
					<Tabs.Trigger class="px-4 py-2" value="eyes">
						Eyes
					</Tabs.Trigger>
					<Tabs.Trigger class="px-4 py-2" value="mouth">
						Mouth
					</Tabs.Trigger>
					<Tabs.Trigger class="px-4 py-2" value="colors">
						Colors
					</Tabs.Trigger>
					<Tabs.Indicator class="absolute bg-emerald-600 transition-all -bottom-px h-[2px]" />
				</Tabs.List>

				<Tab value="body" legend="Body">
					<For each={bodies}>
						{(body) => (
							<Label checked={String(selectedBody().id === body.id)}>
								<div class="relative">
									<img
										width="200"
										src={`${pathPrefix}/01-body/${body.src}`}
										alt={body.alt}
									/>
									<img
										width="200"
										src={SNAIL_ASSETS.SHELL}
										alt=""
										class="absolute inset-0"
									/>
								</div>
								<span class="sr-only">{body.name}</span>
								<input
									class="sr-only"
									type="radio"
									name="body"
									value={body.id}
									onChange={() => setState("body", body.id)}
									checked={selectedBody().id === body.id}
								/>
							</Label>
						)}
					</For>
				</Tab>

				<Tab value="eyes" legend="Eyes">
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
									onChange={() => setState("eyes", eye.id)}
									checked={selectedEyes().id === eye.id}
								/>
							</Label>
						)}
					</For>
				</Tab>

				<Tab value="mouth" legend="Mouth">
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
									onChange={() => setState("mouth", mouth.id)}
									checked={selectedMouth().id === mouth.id}
								/>
							</Label>
						)}
					</For>
				</Tab>

				<Tab value="colors" legend="Colors">
					<fieldset
						class="block w-full col-span-full border border-stone-300 p-4"
						style={{
							"--hue": state.bodyHue,
							"--saturation": state.bodySat,
							"--brightness": state.bodyBri,
						}}
					>
						<legend>Body</legend>
						<HueSlider
							value={Number(state.bodyHue.replace("deg", ""))}
							setHue={(hue) => setState("bodyHue", `${hue}deg`)}
						/>
						<SaturationSlider
							value={Number(state.bodySat)}
							setSaturation={(sat) => setState("bodySat", String(sat))}
						/>
						<BrightnessSlider
							value={Number(state.bodyBri)}
							setBrightness={(b) => setState("bodyBri", String(b))}
						/>
					</fieldset>
					<fieldset
						class="block w-full col-span-full border border-stone-300 p-4"
						style={{
							"--hue": state.shellHue,
							"--saturation": state.shellSat,
							"--brightness": state.shellBri,
						}}
					>
						<legend>Shell</legend>
						<HueSlider
							value={Number(state.shellHue.replace("deg", ""))}
							setHue={(hue) => setState("shellHue", `${hue}deg`)}
						/>
						<SaturationSlider
							value={Number(state.shellSat)}
							setSaturation={(sat) => setState("shellSat", String(sat))}
						/>
						<BrightnessSlider
							value={Number(state.shellBri)}
							setBrightness={(b) => setState("shellBri", String(b))}
						/>
					</fieldset>
				</Tab>
			</Tabs.Root>
		</form>
	);
}

function Tab(
	props: ParentProps<{
		value: string;
		legend: string;
		style?: JSX.CSSProperties;
	}>,
) {
	return (
		<Tabs.Content
			value={props.value}
			class="my-2 p-8 border-2 border-black/50 focus-within:bg-gray-100"
			style={props.style}
		>
			<fieldset class="grid grid-cols-3">
				<legend class="sr-only">{props.legend}</legend>
				{props.children}
			</fieldset>
		</Tabs.Content>
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
			class="p-2 grid place-items-center gap-2 data-[checked=true]:bg-emerald-200 outline outline-1 focus-within:outline-4 focus-within:outline-emerald-950"
		/>
	);
}

const sliderRootClass =
	/*tw*/ "relative flex flex-col items-center select-none touch-none w-full col-span-full my-4";

function HueSlider(props: {
	value: number;
	setHue: (value: number) => void;
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
			class={sliderRootClass}
			onChange={([value]) => {
				props.setHue(value);
			}}
			name="hue"
			minValue={0}
			maxValue={360}
			defaultValue={[180]}
			value={[props.value]}
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
	value: number;
	setSaturation: (value: number) => void;
}) {
	return (
		<Slider.Root
			class={sliderRootClass}
			onChange={([value]) => props.setSaturation(value)}
			name="saturation"
			minValue={1.5}
			maxValue={4.5}
			value={[props.value]}
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
	value: number;
	setBrightness: (value: number) => void;
}) {
	return (
		<Slider.Root
			class={sliderRootClass}
			onChange={([value]) => props.setBrightness(value)}
			name="brightness"
			minValue={0.8}
			maxValue={1.2}
			defaultValue={[1]}
			step={0.01}
			value={[props.value]}
		>
			<Slider.Label class="w-full text-center">Brightness</Slider.Label>
			<Slider.Track
				class="bg-gray-400 relative rounded-full h-2 w-full flex"
				style={{
					filter:
						"sepia(0.5) \
              hue-rotate(var(--hue, 180deg)) \
              saturate(3) \
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
