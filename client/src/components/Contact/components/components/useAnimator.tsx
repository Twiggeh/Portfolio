/* eslint-disable no-mixed-spaces-and-tabs */
import { useReducer } from 'react';

const useAnimator = (
	initAnimStore: AnimStore
): {
	animStore: AnimStore;
	animate: (action: AnimActions) => void;
	getCss: (key: string) => string;
} => {
	const reducer = (animStore: AnimStore, action: AnimActions): AnimStore => {
		switch (action.type) {
			case 'setAnimation': {
				const existing = animStore[action.key];
				if (!existing)
					throw new Error(`trying to set non existing animation ${action.key}`);

				return {
					...animStore,
					[action.key]: { ...existing, css: action.css },
				};
			}
			case 'setDefault': {
				const existing = animStore[action.key];
				if (existing.default === action.default) return animStore;

				return { ...animStore, [action.key]: { ...existing, default: action.default } };
			}
			case 'debug':
				console.log('ANIM STORE', animStore);
				return animStore;
		}
	};

	const [animStore, setAnimStore] = useReducer(
		reducer,
		initAnimStore ? initAnimStore : {}
	);

	const getCss = (key: string) => {
		const getValue = (input: string | undefined) => {
			if (input === undefined || input === '') return '';

			input = input.trim();
			if (!input.endsWith(';')) return input + ';';

			return input;
		};

		const _default = getValue(animStore[String(key)].default);
		const css = getValue(animStore[String(key)].css);
		return `${_default}${css}`;
	};

	return {
		animStore,
		animate: args => void setTimeout(() => setAnimStore(args), 0),
		getCss,
	};
};

export type AnimStore = {
	[x: string]: {
		default: string;
		css?: string;
	};
};

type AnimActions =
	| {
			type: 'setAnimation';
			key: string;
			css: string;
	  }
	| { type: 'debug' }
	| { type: 'setDefault'; key: string; default: string };

export default useAnimator;
