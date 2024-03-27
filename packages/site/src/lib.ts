import { useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

export function createUrlStore<Defaults extends Record<string, string>>(
	defaults: Defaults,
) {
	const keys = Object.keys(defaults);

	const searchParams = new URLSearchParams(useLocation().search);

	const initialValues: Record<string, string> = {};
	for (const key of keys) {
		initialValues[key] = searchParams.get(key) || defaults[key];
	}

	// @ts-ignore
	const [store, setStore] = createStore<Defaults>(initialValues);

	createEffect(() => {
		const url = new URL(window.location.href);
		for (const key of keys) {
			url.searchParams.set(key, store[key]);
		}
		window.history.replaceState({}, "", url.toString());
	});

	return [store, setStore] as const;
}
