/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ButtonS from './ButtonStyle';
import HoverBorder from '../../../HoverBorder';

const StyledButton = styled.a`
	${ButtonS};
	${({ customCss }) => customCss};
`;

const Button = ({
	content = '',
	customCss = '',
	onClick,
	type,
	disabled = false,
	href,
	as = 'a',
}) => {
	if (onClick) console.log(onClick);
	return (
		<StyledButton
			customCss={`${customCss}
			${
				disabled
					? `color: gray;
				:hover {
					color: gray;
					cursor: not-allowed;
				}`
					: ''
			}
			`}
			as={as}
			href={href}
			onClick={onClick ? onClick : null}
			type={type}
			disabled={disabled && 'disabled'}>
			<HoverBorder hover={disabled ? false : undefined}></HoverBorder>
			{content}
		</StyledButton>
	);
};

Button.propTypes = {
	content: PropTypes.string,
	href: PropTypes.string,
	customCss: PropTypes.any,
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	as: PropTypes.string,
};

export default Button;
