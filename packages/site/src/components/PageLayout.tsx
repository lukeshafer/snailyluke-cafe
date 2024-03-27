import type { RouteSectionProps } from "@solidjs/router";
import { Suspense } from "solid-js";

export default function PageLayout(props: RouteSectionProps) {
	return (
		<>
			<header class="flex bg-stone-900 text-amber-50 items-center">
				<p class="font-serif text-3xl font-bold p-4 leading-7">
					<a
						href="/"
						class="underline decoration-amber-50/0 hover:decoration-amber-50/100 transition-all duration-100 decoration-1 underline-offset-4"
					>
						SnailyLuke
						<br />
						Cafe
					</a>
				</p>
				<nav class="flex flex-wrap underline p-4 gap-4 underline-offset-[3px]">
					<a
						class="hover:underline focus:underline focus:outline focus:outline-2 focus:outline-current"
						href="/create-a-snail"
					>
						Create-A-Snail
					</a>
				</nav>
			</header>
			<Suspense>{props.children}</Suspense>
		</>
	);
}
