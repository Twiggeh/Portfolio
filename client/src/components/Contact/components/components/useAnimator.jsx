import { useReducer } from 'react';

// TODO : Extract into its own component - otherwise it wont render correctly https://hswolff.com/blog/how-to-usecontext-with-usereducer/

/** @param {AnimStore} initAnimStore */
const useAnimator = initAnimStore => {
	/**
	 * @param {AnimStore} animStore
	 * @param {AnimActions} action
	 */
	const reducer = (animStore, action) => {
		switch (action.type) {
			case 'setAnimation': {
				const assignee = {};
				action.css ? (assignee.css = action.css) : '';
				action.default ? (assignee.default = action.default) : '';
				return { ...animStore, [action.key]: assignee };
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
		const getValue = input => {
			if (input === undefined || input === '') return '';
			if (!input.endsWith(';')) return input + ';';
			return input;
		};
		const _default = getValue(animStore[key].default);
		const css = getValue(animStore[key].css);
		return `${_default}${css}`;
	};

	return {
		animStore,
		animate: args => setTimeout(() => setAnimStore(args), 0),
		getCss,
	};
};

/**
 * @typedef AnimLeaf
 * @prop {String} default
 * @prop {String} css
 * @typedef {Object.<string, AnimLeaf>} AnimStore
 * @typedef {{
		type: "setAnimation", key: String} & AnimLeaf
		| {type: "debug"}
		| {type: "setDefault", key: String, default: String}
		} AnimActions
 * */
export default useAnimator;
