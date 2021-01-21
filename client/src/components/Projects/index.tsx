interface ISideAndMainPage {
	side: 'art' | 'projects';
	main: 'projects' | 'art';
}

const SideAndMainPage: React.FC<Partial<ISideAndMainPage>> = (
	{ main = 'projects', side = 'art' } = { main: 'projects', side: 'art' }
) => {
	return (
		<div css={{ display: 'flex', justifyContent: 'space-evenly' }}>
			<SidebarContents content={side} />
			<MainContents content={main} />
		</div>
	);
};

export default SideAndMainPage;

import React from 'react';
import MainContents from '../components/MainContent/index';
import SidebarContents from '../components/Sidebar';
