const MainContents = () => {
	const contentList = allData.map((data, i) => <MainContent data={data} key={i} />);
	return (
		<section
			css={{ display: 'flex', flexDirection: 'column', maxWidth: 'var(--trueWidth)' }}>
			{contentList}
		</section>
	);
};

export default MainContents;

import React from 'react';
import allData from '../../../static/Projects';
import MainContent from './MainContent';
