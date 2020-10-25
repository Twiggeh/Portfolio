import React from 'react';

const DEFAULT_SELECT = {
	selected: '',
	open: false,
	initial: true,
	dispatch: () => {},
};

export default React.createContext(DEFAULT_SELECT);
