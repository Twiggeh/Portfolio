interface IMainContents {
	content?: 'projects' | 'art';
}

const MainContents: React.FC<IMainContents> = ({ content = 'projects' }) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const renderThis: Content[] = allData[String(content)];
	const contentList = renderThis.map((data, i) => <MainContent data={data} key={i} />);
	return <StyledSection>{contentList}</StyledSection>;
};

var StyledSection = styled.section`
	display: flex;
	flex-direction: column;
	max-width: var(--trueWidth);
`;

export default MainContents;

import styled from '@emotion/styled';
import React from 'react';
import allData, { Content } from '../../../static/Projects';
import MainContent from './MainContent';
