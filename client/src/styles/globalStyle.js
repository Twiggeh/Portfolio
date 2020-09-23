import { css } from '@emotion/core';

const colors = {
	grayBorder: '#3F3F3F',
	darkestInfill: '#17181A',
	bgInfill: '#1D2024',
	whiteText: '#EAEAEA',
};

const fonts = {
	mainFont: 'Montserrat',
	fallback: 'Roboto',
};

/** @type {import('@emotion/core').Interpolation} */
const outline = {
	borderColor: colors.grayBorder,
	borderWidth: '1px',
	borderStyle: 'solid',
};

const customOutline = (top = 0, right = 0, bottom = 0, left = 0) => {
	/** @type {import('@emotion/core').Interpolation} */
	return {
		borderColor: colors.grayBorder,
		borderTopWidth: `${top}px`,
		borderBottomWidth: `${bottom}px`,
		borderLeftWidth: `${left}px`,
		borderRightWidth: `${right}px`,
		borderStyle: 'solid',
	};
};

export const styles = {
	outline,
	customOutline,
};

export default {
	colors,
	fonts,
	styles,
};
