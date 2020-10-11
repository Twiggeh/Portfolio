import { css } from '@emotion/core';
import {
	colors,
	fonts,
	fontSizes,
	queries,
	styles,
} from '../../../../../styles/globalStyle';

var ButtonS = css`
	font-family: ${fonts.mainFont};
	color: ${colors.whiteText};
	text-align: center;
	box-sizing: border-box;
	text-decoration: none;
	padding-top: 1em;
	padding-bottom: 1em;
	padding-left: 1.7em;
	padding-right: 1.7em;
	background-color: ${colors.darkestInfill};
	letter-spacing: 0.265em;
	&:hover {
		svg {
			fill: hotpink;
		}
		color: hotpink;
		cursor: pointer;
		border-color: hotpink;
	}
	font-size: max(calc(${fontSizes.text} - 0.3rem), 16px);
	${styles.outline};
	${[queries.mainQueries[1]]} {
		width: 100%;
	}
`;

export default ButtonS;