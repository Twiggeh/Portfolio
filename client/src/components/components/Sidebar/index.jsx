const mq = globalStyle.queries.mainQueries;

const SidebarContents = () => {
	return (
		<SidebarWrapper>
			<SidebarTitle title={'art'} subTitle={'Highlighting some of my paintings'} />
			{allData.map((data, i) => (
				<SidebarContent key={i} data={data} />
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

export default SidebarContents;
import React from 'react';
import SidebarContent from './SidebarContent';
import SidebarTitle from './SidebarTitle';
import allData from '../../../static/Projects';
import globalStyle from '../../../styles/globalStyle';
import styled from '@emotion/styled';
