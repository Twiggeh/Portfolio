import React from 'react';
import AnimatorData from './components/components/AnimatorContext';
import useAnimator from './components/components/useAnimator';
import Form from './components/Form';
import SelectOpts from './components/SelectOpts';

/** @type {import('./components/components/useAnimator').AnimStore} */
const initAnimStore = {
	bSel: {
		default: `
		transform: translateY(
			calc((var(--max-height) + var(--margin-Option)) * -${SelectOpts.length - 1})
		);
	`,
	},
	Sel: {
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
