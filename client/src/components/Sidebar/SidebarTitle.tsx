interface ISidebarTitle {
	title: string;
	subTitle?: string;
}

const SidebarTitle: React.FC<ISidebarTitle> = ({ title, subTitle = '' }) => {
	return (
		<header css={{ marginTop: '5rem', overflow: 'hidden' }}>
			<AsideTitle>{title}</AsideTitle>
			<AsideSubtitle>{subTitle}</AsideSubtitle>
			<Separator />
		</header>
	);
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
import styled from '@emotion/styled';
import { fontSizes } from '../../styles/globalStyle';
import { Separator } from '../MainContent/NoteRenderer';
