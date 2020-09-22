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

const outline = {
	borderColor: colors.grayBorder,
	borderStyle: ['1px', 'solid'],
};

export const styles = {
	outline,
};

export default {
	colors,
	fonts,
	styles,
};
