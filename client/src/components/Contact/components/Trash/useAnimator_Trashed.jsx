import { createContext, useReducer } from 'react';

/**
 * @type {{ animate: function(string, string):void , animState: Object.<string, string>}}
 */
const DEFAULT_CONTEXT = {};

export const UseAnimatorContext = createContext(DEFAULT_CONTEXT);

/**
 * @param {Object.<string,string>} param0
 */
const useAnimator = (init = {}) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'setAnim': {
				return { ...state, [action.key]: action.animation };
			}
			default:
				throw new Error(`${action.type} is not supported by useAnimator`);
		}
	};

	const [state, dispatch] = useReducer(reducer, init);

	const animate = (key, animation = '') => {
		dispatch({ type: 'setAnim', animation, key });
	};

	return [UseAnimatorContext.Provider, { animate, animState: state }];
};

export default useAnimator;
