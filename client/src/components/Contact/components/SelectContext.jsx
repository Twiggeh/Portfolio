import React from 'react';

/** @typedef {{
	selected: string,
	open: boolean,
	initial: true,
	selectedIndex: number,
	dispatch: function(import("./Select").OptionActions):void
}} SelectState */
const DEFAULT_SELECT = {
	selected: '',
	open: false,
	initial: true,
	selectedIndex: 0,
	dispatch: () => {},
};

export default React.createContext(DEFAULT_SELECT);
