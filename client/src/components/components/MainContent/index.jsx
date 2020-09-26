const MainContents = () =>
	allData.map((data, i) => (
		<MainContent
			features={data.features}
			buttons={data.buttons}
			subTitle={data.subTitle}
			title={data.title}
			key={i}
		/>
	));

export default MainContents;

import React from 'react';
import allData from '../../../../public/static/Projects';
import MainContent from './MainContent';
