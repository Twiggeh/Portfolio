const mq = globalStyle.queries.mainQueries;

const SidebarContents = ({ content = 'art' }) => {
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
SidebarContents.propTypes = {
	content: PropTypes.string,
};

export default SidebarContents;

import React from 'react';
import NewSidebarContent from './NewSidebarContent';
import SidebarTitle from './SidebarTitle';
import allData from '../../../static/Projects';
import globalStyle from '../../../styles/globalStyle';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
