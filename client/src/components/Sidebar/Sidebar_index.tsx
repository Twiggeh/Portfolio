import React from 'react';
import styled from '@emotion/styled';
import globalStyle from '../../styles/globalStyle';
import NewSidebarContent from './NewSidebarContent';
import SidebarTitle from './SidebarTitle';
import allData from '../../static/Projects';

const mq = globalStyle.queries.mainQueries;

interface ISidebarContent {
	content: keyof typeof allData;
}

const SidebarContent: React.FC<ISidebarContent> = ({ content = 'art' }) => {
	const renderThis = allData[content];
	return (
		<SidebarWrapper>
			<SidebarTitle title={content} subTitle={'Highlighting some of my paintings'} />
			{renderThis.map((data, i) => (
				<NewSidebarContent key={i} data={data} />
			))}
		</SidebarWrapper>
	);
};

var SidebarWrapper = styled.div`
	--SidebarWidth: 20%;
	width: var(--SidebarWidth);
	${[mq[0]]} {
		display: none;
	}
`;

export default SidebarContent;
