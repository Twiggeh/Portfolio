import { useReducer } from 'react';

/** @param {AnimStore} initAnimStore
 * 	@returns {{
		animStore: AnimStore,
		animate: (action: AnimActions)=>void,
		getCss: (key: AnimKey)=>string,
	}}
 */
const useAnimator = initAnimStore => {
	/**
	 * @param {AnimStore} animStore
	 * @param {AnimActions} action
	 */
	const reducer = (animStore, action) => {
		switch (action.type) {
			case 'setAnimation': {
				return {
					...animStore,
					[action.key]: { ...animStore[action.key], css: action.css },
				};
			}
			case 'setDefault': {
				const existing = animStore[action.key];
				if (existing.default === action.default) return animStore;
				return { ...animStore, [action.key]: { ...existing, default: action.default } };
			}
			case 'debug':
				console.log(animStore);
				return animStore;
			default:
				throw new Error(`${action.type} is not supported by useAnimator.`);
		}
	};

	const [animStore, setAnimStore] = useReducer(
		reducer,
		initAnimStore ? initAnimStore : {}
	);

	const getCss = key => {
		/** @param {string} input */
		const getValue = input => {
			if (input === undefined || input === '') return '';
			input = input.trim();
			if (!input.endsWith(';')) return input + ';';
			return input;
		};
		const _default = getValue(animStore[key].default);
		const css = getValue(animStore[key].css);
		return `${_default}${css}`;
	};

	return {
		animStore,
		animate: args => void setTimeout(() => setAnimStore(args), 0),
		getCss,
	};
};

/**
 * @typedef AnimLeaf
 * @prop {String} default
 * @prop {String} css
 * @typedef {string} AnimKey
 * @typedef {Object.<string, AnimLeaf>} AnimStore
 * @typedef {{
		type: "setAnimation", key: AnimKey, css: Array<import('@emotion/core').Interpolation>} 
		| {type: "debug"}
		| {type: "setDefault", key: AnimKey, default: import('@emotion/core').Interpolation}
		} AnimActions
 * */
export default useAnimator;
