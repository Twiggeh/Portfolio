/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ButtonS from './ButtonStyle';
import HoverBorder from '../../../HoverBorder';

const StyledButton = styled.button`
	${ButtonS};
	${({ customCss }) => customCss};
`;

const Button = ({ content = '', customCss = '', onClick, type, disabled = false }) => {
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
			onClick={onClick}
			type={type}
			disabled={disabled && 'disabled'}
		>
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
};

export default Button;
