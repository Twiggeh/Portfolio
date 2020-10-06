const MainContents = () => {
	const contentList = allData.map((data, i) => <MainContent data={data} key={i} />);
	return contentList;
};

export default MainContents;

import React from 'react';
import allData from '../../../static/Projects';
import MainContent from './MainContent';
