const MainContents = () => {
	const contentList = allData.map((data, i) => (
		<MainContent
			features={data.features}
			buttons={data.buttons}
			subTitle={data.subTitle}
			title={data.title}
			key={i}
		/>
	));
	return contentList;
};

export default MainContents;

import React from 'react';
import allData from '../../../static/Projects';
import MainContent from './MainContent';
