interface ISideAndMainPage {
	side: 'art' | 'projects';
	main: 'projects' | 'art';
}

const SideAndMainPage: React.FC<Partial<ISideAndMainPage>> = (
	{ main = 'projects', side = 'art' } = { main: 'projects', side: 'art' }
) => {
	return (
		<div css={{ display: 'flex', justifyContent: 'space-evenly' }}>
			<SidebarContent content={side} />
			<MainContents content={main} />
		</div>
	);
};

export default SideAndMainPage;

import React from 'react';
import MainContents from './MainContent';
import SidebarContent from './Sidebar/Sidebar_index';
