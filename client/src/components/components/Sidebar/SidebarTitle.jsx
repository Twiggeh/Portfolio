const SidebarTitle = ({ title, subTitle = '', picture = './static/khala_close.jpg' }) => {
	return (
		<header css={{ marginTop: '5rem', overflow: 'hidden' }}>
			<AsideImage picture={picture} />
			<AsideTitle>{title}</AsideTitle>
			<AsideSubtitle>{subTitle}</AsideSubtitle>
			<Separator></Separator>
		</header>
	);
};

SidebarTitle.propTypes = {
	alt: PropTypes.string,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	picture: PropTypes.string,
};

export default SidebarTitle;

// TODO : make these all template strings

var AsideImage = styled.div`
	background-image: url(${({ picture }) => picture});
	background-repeat: no-repeat;
	background-position: bottom center;
	background-size: cover;
	width: clamp(150px, 10vw, 10vw);
	height: clamp(150px, 10vw, 10vw);
	margin-bottom: 2rem;
`;

var AsideTitle = styled.h1({
	letterSpacing: '0.265rem',
	fontSize: fontSizes.sideTitle,
	textTransform: 'uppercase',
	fontWeight: 600,
	marginBottom: '1rem',
});

var AsideSubtitle = styled.h2({
	fontSize: fontSizes.sideSubTitle,
	letterSpacing: '0.265rem',
	marginBottom: '2rem',
});

import React from 'react';
import PropTypes from 'prop-types';
import { fontSizes } from '../../../styles/globalStyle';
import styled from '@emotion/styled';
import { Separator } from '../MainContent/MainContent.jsx';
