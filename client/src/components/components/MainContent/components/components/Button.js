import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ButtonS from './ButtonStyle';
import HoverBorder from '../../../HoverBorder';

const StyledButton = styled.a`
	${ButtonS};
	${({ customCss }) => customCss};
`;

const Button = ({ content = '', href = '', customCss = '' }) => {
	return (
		<StyledButton href={href} customCss={customCss}>
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
