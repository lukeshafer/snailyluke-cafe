import { useLocation, type RouteSectionProps } from "@solidjs/router";
import {
	For,
	createSignal,
	type ParentProps,
	type JSX,
	createEffect,
} from "solid-js";
import { isServer } from "solid-js/web";

export default function CreateASnail(props: RouteSectionProps) {
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
		name: "Oval",
		id: "oval",
		src: "body-oval.png",
		alt: "Oval-shaped body",
		eyeX: "210%",
		eyeY: "50%",
		mouthX: "475%",
		mouthY: "340%",
	},
	{
		name: "Chunky",
		id: "chunky",
		src: "body-chunky.png",
		alt: "Big chunky body",
		eyeX: "205%",
		eyeY: "25%",
		mouthX: "470%",
		mouthY: "280%",
	},
	{
		name: "Short body",
		id: "short",
		src: "body-short.png",
		alt: "Short body",
		eyeX: "210%",
		eyeY: "110%",
		mouthX: "475%",
		mouthY: "500%",
	},
] satisfies Array<Body>;

const eyes = [
	{
		name: "Default",
		id: "eyes-default",
		src: "eyes-default.png",
		alt: "Eyes with no particular expression",
	},
	{
		name: "Angry",
		id: "eyes-angry",
		src: "eyes-angry.png",
		alt: "Eyes with angry eyebrows",
	},
	{
		name: "Sad",
		id: "eyes-sad",
		src: "eyes-sad.png",
		alt: "Eyes with sad eyebrows",
	},
];

const mouths = [
	{
		name: "Smile",
		id: "mouth-smile",
		src: "mouth-smile.png",
		alt: "Smiling mouth",
	},
	{
		name: "Frown",
		id: "mouth-frown",
		src: "mouth-frown.png",
		alt: "Frowning mouth",
	},
	{
		name: "Neutral",
		id: "mouth-neutral",
		src: "mouth-neutral.png",
		alt: "Neutral mouth",
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

	createEffect(() => {
		const url = new URL(window.location.href);
		url.searchParams.set("body", selectedBody().id);
		url.searchParams.set("eyes", selectedEyes().id);
		url.searchParams.set("mouth", selectedMouth().id);
		window.history.replaceState({}, "", url.toString());
	});

	return (
		<form>
			<div class="w-60 h-60 bg-gray-200 grid place-items-center mx-auto">
				<figure class="relative w-[200px] h-[200px]">
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
							<span>{body.name}</span>
							<input
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
							<span>{eye.name}</span>
							<input
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
							<span>{mouth.name}</span>
							<input
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
			class="p-2 grid place-items-center gap-2 data-[checked=true]:bg-lime-200 focus-within:outline focus-within:outline-4 focus-within:outline-emerald-950"
		/>
	);
}
