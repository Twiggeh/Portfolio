const SidebarTitle = ({ title, subTitle = '' }) => {
	return (
		<header css={{ marginTop: '5rem', overflow: 'hidden' }}>
			<AsideTitle>{title}</AsideTitle>
			<AsideSubtitle>{subTitle}</AsideSubtitle>
			<Separator />
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

var AsideTitle = styled.h1({
	letterSpacing: '0.265rem',
	fontSize: fontSizes.sideTitle,
	textTransform: 'uppercase',
	fontWeight: 600,
	marginBottom: '1rem',
});

var AsideSubtitle = styled.h2({
	fontSize: fontSizes.sideSubTitle,
	lineHeight: '1.4em',
	letterSpacing: '0.265rem',
	marginBottom: '2rem',
});

import React from 'react';
import PropTypes from 'prop-types';
import { fontSizes } from '../../../styles/globalStyle';
import styled from '@emotion/styled';
import { Separator } from '../MainContent/components/NoteRenderer';
