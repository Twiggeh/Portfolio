import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ content = '', href = '', customCss = '' }) => {
	const StyledButton = styled.a`
		${ButtonS};
		${customCss};
	`;
	return (
		<StyledButton href={href}>
			<HoverBorder></HoverBorder>
			{content}
		</StyledButton>
	);
};

Button.propTypes = {
	content: PropTypes.string,
	href: PropTypes.string,
	customCss: PropTypes.any,
};

export default Button;

import styled from '@emotion/styled';
import ButtonS from './ButtonStyle';
import HoverBorder from '../../../HoverBorder';
