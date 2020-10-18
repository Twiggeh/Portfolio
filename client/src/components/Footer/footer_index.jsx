const Footer = () => {
	return (
		<FooterS>
			<FooterContentWrap>
				<LinkWrap>
					<Link>Licenses</Link>
					<Link>Contact</Link>
					<Link>Privacy</Link>
				</LinkWrap>
				<Copyright>
					Copyright &copy; Twiggeh -
					<nobr> Redistribution without permission forbidden</nobr>
				</Copyright>
			</FooterContentWrap>
		</FooterS>
	);
};

var Copyright = styled.div`
	margin-top: 2.2em;
	line-height: 1.4em;
	text-align: center;
`;

var FooterContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2.2em;
`;

var Link = styled.a`
	font-size: ${fontSizes.text};
	position: relative;
	transition: color 200ms ease-in;
	::after {
		content: '';
		left: 0;
		bottom: -0.2em;
		position: absolute;
		width: 103%;
		height: 2px;
		z-index: 1;
		background-color: hotpink;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 200ms ease-in;
	}
	:hover {
		color: hotpink;
		::after {
			transform-origin: left;
			transform: scaleX(1);
		}
	}
`;

var LinkWrap = styled.section`
	${Link}:not(:first-of-type) {
		margin-left: 6vw;
	}
	margin-left: 2em;
	margin-right: 2em;
`;

var FooterS = styled.footer`
	background-color: ${colors.darkestInfill};
	${styles.customOutline(1)};
	margin-top: 2vh;
	width: 100%;
	min-height: 12vh;
`;

export default Footer;

import React from 'react';
import styled from '@emotion/styled';
import { colors, fontSizes, styles } from '../../styles/globalStyle';
