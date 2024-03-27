export interface SnailPart {
	name: string;
	id: string;
	src: string;
	alt: string;
}

export interface SnailBody extends SnailPart {
	faceX: string;
	faceY: string;
	scale?: number;
}

export const bodies = [
	{
		name: "Oval",
		id: "oval",
		src: "oval.png",
		alt: "Oval-shaped body",
		faceX: "65%",
		faceY: "14%",
		scale: 0.9,
	},
	{
		name: "Short body",
		id: "short",
		src: "short.png",
		alt: "Short body",
		faceX: "64%",
		faceY: "32%",
		scale: 0.86,
	},
	{
		name: "Tall body",
		id: "tall",
		src: "tall.png",
		alt: "Tall body",
		faceX: "64%",
		faceY: "4%",
		scale: 0.85,
	},
	{
		name: "Chunky",
		id: "chunky",
		src: "chunky.png",
		alt: "Big chunky body",
		faceX: "62%",
		faceY: "7%",
	},
	{
		name: "Round",
		id: "round",
		src: "round.png",
		alt: "Round-shaped body",
		faceX: "64%",
		faceY: "22%",
	},
	{
		name: "Small body",
		id: "small",
		src: "small.png",
		alt: "Small body",
		faceX: "60%",
		faceY: "46%",
		scale: 0.8,
	},
	{
		name: "Chubby body",
		id: "chubby",
		src: "chubby.png",
		alt: "Short chubby body",
		faceX: "65%",
		faceY: "35%",
		scale: 0.9,
	},
	{
		name: "Lanky body",
		id: "lanky",
		src: "lanky.png",
		alt: "Tall lanky body",
		faceX: "70%",
		faceY: "4%",
		scale: 0.85,
	},
] satisfies Array<SnailBody>;

export const eyes = [
	{
		name: "Default",
		id: "default",
		src: "default.png",
		alt: "Eyes with no particular expression",
	},
	{
		name: "Wide",
		id: "wide",
		src: "wide.png",
		alt: "Eyes with no particular expression, spread far apart from each other",
	},
	{
		name: "Close",
		id: "close",
		src: "close.png",
		alt: "Eyes with no particular expression, horizontally close to each other",
	},
	{
		name: "High",
		id: "high",
		src: "high.png",
		alt: "Eyes with no particular expression, higher than usual",
	},
	{
		name: "Low",
		id: "low",
		src: "low.png",
		alt: "Eyes with no particular expression, lower than usual",
	},
	{
		name: "Happy",
		id: "happy",
		src: "happy.png",
		alt: "Eyes closed with a happy expression",
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
		name: "Glistening",
		id: "glistening",
		src: "glistening.png",
		alt: "Glistening eyes",
	},
];

export const mouths = [
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
		name: "Joyful",
		id: "joyful",
		src: "joyful.png",
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
