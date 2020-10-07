/** @param {{
						data:import('../../../static/Projects').Content
  					}} param0 */
const SidebarContent = ({
	data: { title, cover = './static/khala_close.jpg', subTitle, buttons, notes, descPage },
}) => {
	if (!title) return null;
	return (
		<SideWrapper href={descPage}>
			<SideImg src={cover} />
			<SideTitle>{title}</SideTitle>
			<SideSubTitle>{subTitle}</SideSubTitle>
		</SideWrapper>
	);
};

var SideImg = styled.img`
	width: 100%;
`;

var SideWrapper = styled.a`
	display: flex;
	flex-direction: column;
	margin-top: 4vh;
	${styles.outline};
	background-color: ${colors.darkestInfill};
	:hover {
		cursor: pointer;
		color: hotpink;
		border-color: hotpink;
	}
	text-decoration: none;
`;

var SideTitle = styled.h4`
	font-size: calc(${fontSizes.text} * 1.2);
	letter-spacing: 0.2em;
	text-transform: uppercase;
	margin-top: 1rem;
	margin-left: 1rem;
`;

var SideSubTitle = styled.h5`
	font-size: ${fontSizes.text};
	letter-spacing: 0.1em;
	margin-top: 0.7rem;
	margin-left: 1rem;
	margin-bottom: 0.7rem;
`;

SidebarContent.propTypes = {
	data: PropTypes.object,
};

export default SidebarContent;

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colors, fontSizes, styles } from '../../../styles/globalStyle';
