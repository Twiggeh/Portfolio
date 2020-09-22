const MainContents = () =>
	allData.map((data, i) => (
		<MainContent
			css={{ color: 'green' }}
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
import { styles } from '../../../styles/globalStyle';
import MainContent from './MainContent';
import { jsx } from '@emotion/core';
