import styled from '@emotion/styled';
import React from 'react';
import { colors, styles } from '../styles/globalStyle';
import HoverBorder from './components/HoverBorder';

const SideBtn = styled.a`
	pointer-events: all;
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
	${styles.outline};
	svg {
		width: 2vw;
	}
	width: 2.8vw;
	height: 2.8vw;
	margin-right: 4%;
	background: ${colors.darkestInfill};
	z-index: 2;
	path,
	svg {
		transition: all 250ms ease-in-out;
	}
	:hover {
		path,
		svg {
			fill: hotpink;
		}
	}
`;

interface ISmallButton {
	href: string;
	onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const SmallButton: React.FC<ISmallButton> = ({ children, href, onClick }) => (
	<SideBtn href={href} onClick={onClick}>
		<HoverBorder
			customCss={`
				width: calc(100% + 2px) !important;
				height: calc(100% + 2px) !important;
				top: -1px;
				left: -1px;
			`}
		/>
		{children}
	</SideBtn>
);

export default SmallButton;
