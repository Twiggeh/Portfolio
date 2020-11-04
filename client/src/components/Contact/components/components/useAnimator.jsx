import { createContext, useReducer } from 'react';

/** 
  @type {{
    animStore: AnimStore,
		animate: function(AnimStore, AnimActions):void,
		getCss: function(string):string
	}}  
	*/
const DEFAUTLT_ANIMATOR_DATA = {
	animStore: {},
	animate: () => {},
	getCss: () => {},
};
// TODO : Extract into its own component - otherwise it wont render correctly https://hswolff.com/blog/how-to-usecontext-with-usereducer/
const AnimatorData = createContext(DEFAUTLT_ANIMATOR_DATA);

/** @param {AnimStore} animStore */
const useAnimator = animStore => {
	/**
	 * @param {AnimStore} animStore
	 * @param {AnimActions} action
	 */
	const reducer = (animStore, action) => {
		switch (action.type) {
			case 'addAnimation': {
				const assignee = {};
				action.css ? (assignee.css = action.css) : '';
				action.default ? (assignee.default = action.default) : '';

				animStore[action.key] = {
					...animStore[action.key],
					...assignee,
				};

				return animStore;
			}
			case 'debug':
				console.log(JSON.stringify(animStore));
				return animStore;
			default:
				throw new Error(`${action.type} is not supported by useAnimator.`);
		}
	};

	const [state, dispatch] = useReducer(reducer, animStore ? animStore : {});

	const getCss = key => {
		const getValue = input => {
			if (input === undefined) return '';
			if (!input.endsWith(';')) return input + ';';
			return input;
		};
		const _default = getValue(animStore[key].default);
		const css = getValue(animStore[key].css);
		return `${_default}${css}`;
	};

	return {
		animStore: state,
		animate: dispatch,
		AnimatorData: AnimatorData.Provider,
		getCss,
	};
};

/**
 * @typedef AnimLeaf
 * @prop {String} default
 * @prop {String} css
 * @typedef {Object.<string, AnimLeaf>} AnimStore
 * @typedef {{
		type: "addAnimation", key: String} & AnimLeaf
		| {type: "debug"}
		} AnimActions
 * */
export default useAnimator;
