import React from 'react';
import AnimatorData from './components/components/AnimatorContext';
import useAnimator from './components/components/useAnimator';
import Form from './components/Form';

/** @type {import('./components/useAnimator').AnimStore} */
const initAnimStore = {
	bSel: {
		default: '',
	},
};

const Contact = () => {
	const { animStore, animate, getCss } = useAnimator(initAnimStore);
	return (
		<AnimatorData.Provider value={{ animStore, animate, getCss }}>
			<Form></Form>
		</AnimatorData.Provider>
	);
};

export default Contact;
