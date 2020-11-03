import { createContext } from 'react';

/**
 * @type {{
		animate: function(import('./Animator').AnimatorAction): void
	}}
 */
const DEFAULT_ANIMATOR_CONTEXT = {
	animTree: {},
	animate: () => {},
};

export default createContext(DEFAULT_ANIMATOR_CONTEXT);
