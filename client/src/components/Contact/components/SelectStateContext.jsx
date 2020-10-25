import { createContext } from 'react';

const SELECT_STATE_CONTEXT_DEFAULT = {
	open: false,
	initial: true,
	selected: '',
	selectDispatch: () => {},
};

export default createContext(SELECT_STATE_CONTEXT_DEFAULT);
