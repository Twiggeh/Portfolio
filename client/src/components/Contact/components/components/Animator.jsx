import { createContext, useReducer } from 'react';

const AnimatorData = createContext({ state: {}, dispatch: () => {} });

const useAnimator = tree => {
	const [state, dispatch] = useReducer(reducer, tree);

	const reducer = (state, action) => {
		switch (action.type) {
			default:
				console.log(state);
		}
	};

	return { state, dispatch, AnimatorData: AnimatorData.Provider };
};

export default useAnimator;

//! Gets the vanilla DOM -> might be useful

// import { createContext, useReducer } from 'react';
//
// const AnimatorData = createContext({ state: {}, dispatch: () => {} });
//
// const useAnimator = target => {
// 	const reducer = (state, action) => {
// 		if (target.current === undefined) return;
// 		switch (action.type) {
// 			default:
// 				console.log(target.current);
// 		}
// 	};
//
// 	const initialState = {};
// 	const [state, dispatch] = useReducer(reducer, initialState);
// 	return { state, dispatch, AnimatorData: AnimatorData.Provider };
// };
//
// export default useAnimator;
//
