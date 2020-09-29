const ProjectsPage = () => {
	return (
		<div css={{ display: 'flex', justifyContent: 'space-evenly' }}>
			<SidebarContents />
			<MainContents />
		</div>
	);
};

export default ProjectsPage;

import React from 'react';
import MainContents from '../components/MainContent/index';
import SidebarContents from '../components/Sidebar';
