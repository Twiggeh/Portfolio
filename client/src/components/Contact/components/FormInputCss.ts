import { css } from '@emotion/react';
import { colors, styles } from '../../../styles/globalStyle';

const FormInputCss = css`
	margin-bottom: 2rem;
	padding: 1rem;
	background: ${colors.darkestInfill};
	color: white;
	${styles.outline};
	font-size: var(--font-size);
	display: block;
	max-width: var(--formWidth);
	min-width: var(--formWidth);
	box-sizing: border-box;
`;
export default FormInputCss;
