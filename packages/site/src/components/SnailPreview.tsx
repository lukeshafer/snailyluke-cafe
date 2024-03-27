import { SNAIL_ASSETS } from "~/constants";

export default function SnailPreview(props: {
	body: string;
	eyes: string;
	mouth: string;
	faceX: string;
	faceY: string;
	scale?: number;
	bodyColors: {
		hue: string;
		brightness: string;
		saturation: string;
	};
	shellColors: {
		hue: string;
		brightness: string;
		saturation: string;
	};
}) {
	const filter =
		"contrast(0.8) sepia(0.5) hue-rotate(var(--hue, 180deg)) saturate(var(--saturation, 3)) brightness(var(--brightness, 1))";

	return (
		<div class="w-60 h-60 bg-gray-200 grid justify-items-center items-end mx-auto">
			<figure
				class="relative w-5/6 h-5/6"
				style={{
					"--scale": props.scale ?? 1,
				}}
			>
				<div
					class="relative w-full h-full"
					style={{
						"--hue": props.bodyColors.hue,
						"--saturation": props.bodyColors.saturation,
						"--brightness": props.bodyColors.brightness,
						filter,
					}}
				>
					<img
						src={`${SNAIL_ASSETS.BODY}/${props.body}`}
						alt=""
						class="absolute w-full"
					/>
					<div
						class="absolute top-[--y] left-[--x]"
						style={{
							width: "calc(var(--scale) * 30%)",
							"--x": props.faceX,
							"--y": props.faceY,
						}}
					>
						<img src={`${SNAIL_ASSETS.EYES}/${props.eyes}`} alt="" />
						<img
							src={`${SNAIL_ASSETS.MOUTH}/${props.mouth}`}
							alt=""
							class="absolute -bottom-[15%] left-1/4 w-1/2 ml-[2px]"
						/>
					</div>
				</div>
				<img
					src={SNAIL_ASSETS.SHELL}
					alt=""
					class="absolute inset-0"
					style={{
						"--hue": props.shellColors.hue,
						"--saturation": props.shellColors.saturation,
						"--brightness": props.shellColors.brightness,
						filter,
					}}
				/>
			</figure>
		</div>
	);
}
