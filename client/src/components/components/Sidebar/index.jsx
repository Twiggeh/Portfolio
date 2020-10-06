const mq = globalStyle.queries.mainQueries;

const SidebarContents = () => {
	const sidebarList = allData.map((data, i) => {
		return <SidebarContent key={i} title={data.title} />;
	});
	return (
		<SidebarWrapper>
			<SidebarTitle title={'art'} subTitle={'Highlighting some of my paintings'} />
			{sidebarList}
		</SidebarWrapper>
	);
};

var SidebarWrapper = styled.div`
	width: 25%;
	overflow: hidden;
	${[mq[1]]} {
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
