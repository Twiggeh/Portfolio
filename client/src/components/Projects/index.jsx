const SideAndMainPage = (
	{ main = 'projects', side = 'art' } = { main: 'projects', side: 'art' }
) => {
	return (
		<div css={{ display: 'flex', justifyContent: 'space-evenly' }}>
			<SidebarContents content={side} />
			<MainContents content={main} />
		</div>
	);
};
SideAndMainPage.propTypes = {
	main: PropTypes.string,
	side: PropTypes.string,
};

export default SideAndMainPage;

import React from 'react';
import MainContents from '../components/MainContent/index';
import SidebarContents from '../components/Sidebar';
import PropTypes from 'prop-types';
