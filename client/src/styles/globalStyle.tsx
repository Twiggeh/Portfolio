/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';

type ICross = (
	arg0?: React.SVGProps<SVGSVGElement> & {
		size?: number;
		color?: string;
		width?: number;
		lineCap?: React.SVGProps<SVGLineElement>['strokeLinecap'];
	}
) => JSX.Element;

const cross: ICross = (
	{ size = 40, color = 'white', width = 3, lineCap = 'round' } = {
		size: 40,
		color: 'white',
		width: 3,
		lineCap: 'round',
	}
) => (
	<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill='none'>
		<line
			x1='2.52952'
			y1='2.52943'
			x2='36.4706'
			y2='36.4706'
			stroke={color}
			css={{ strokeWidth: width, strokeLinecap: lineCap }}
		/>
		<line
			x1='36.4707'
			y1='2.52943'
			x2='2.52958'
			y2='36.4706'
			stroke={color}
			css={{ strokeWidth: width, strokeLinecap: lineCap }}
		/>
	</svg>
);

export const colors = {
	grayBorder: '#3F3F3F',
	darkestInfill: '#17181A',
	bgInfill: '#1D2024',
	whiteText: '#EAEAEA',
};

export const fonts = {
	mainFont: 'Montserrat',
	fallback: 'Roboto',
};

const outline = `
	border-color: ${colors.grayBorder};
	border-width: 1px;
	border-style: solid;
`;

const customOutline = (top = 0, right = 0, bottom = 0, left = 0) => {
	return `
		border-color: ${colors.grayBorder};
		border-top-width: ${top}px;
		border-bottom-width: ${bottom}px;
		border-left-width: ${left}px;
		border-right-width: ${right}px;
		border-style: solid;
	`;
};

const numQueries = [1400, 700];
const mainQueries = numQueries.map(query => `@media (max-width: ${query}px)`);

export const styles = {
	outline,
	customOutline,
	contentPaddingSides: '3rem',
};

export const fontSizes = {
	sideTitle: 'clamp(35px, 2.8vw, 60px)',
	sideSubTitle: 'clamp(16px, 1.4vw, 50px)',
	mainNoteTitle: 'clamp(30px, 2vw, 60px)',
	navEl: 'clamp(20px, 1.6vw, 1.6vw)',
	navTitle: 'clamp(30px, 2.2vw, 2.2vw)',
	text: 'clamp(18px, 1.2vw, 35px)',
};

import GithubLogo from 'icons/githubLogo.svg';
import DiscordLogo from 'icons/discordLogo.svg';
import HamburgerMenu from 'icons/hamburger.svg';
import Download from 'icons/download.svg';
import Reference from 'icons/reference.svg';

export const svgs = {
	GithubLogo,
	DiscordLogo,
	HamburgerMenu,
	Download,
	Reference,
	cross,
};

export const queries = {
	mainQueries,
	numQueries,
};

export default {
	colors,
	fonts,
	styles,
	svgs,
	queries,
};
