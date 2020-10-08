const MainContents = ({ content = 'projects' }) => {
	const renderThis = allData[content];
	const contentList = renderThis.map((data, i) => <MainContent data={data} key={i} />);
	return (
		<section
			css={{ display: 'flex', flexDirection: 'column', maxWidth: 'var(--trueWidth)' }}>
			{contentList}
		</section>
	);
};

MainContents.propTypes = {
	content: PropTypes.string,
};

export default MainContents;

import React from 'react';
import allData from '../../../static/Projects';
import MainContent from './MainContent';
import PropTypes from 'prop-types';
