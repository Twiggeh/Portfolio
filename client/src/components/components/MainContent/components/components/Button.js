import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ content = '', href = '' }) => {
	return (
		<StyledButton href={href}>
			<HoverBorder></HoverBorder>
			{content}
		</StyledButton>
	);
};

var StyledButton = styled.a`
	${ButtonS};
`;

Button.propTypes = { content: PropTypes.string, href: PropTypes.string };

export default Button;

import styled from '@emotion/styled';
import ButtonS from './ButtonStyle';
import HoverBorder from '../../../HoverBorder';
