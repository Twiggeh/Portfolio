/* eslint-disable indent */
import React from 'react';
import styled from '@emotion/styled';
import ButtonS from './ButtonStyle';
import HoverBorder from '../../../HoverBorder';

const StyledButton = styled.a<CustomCSS & { as: string; disabled: string | boolean }>`
	${ButtonS};
	${({ css }) => css};
`;

const Button: React.FC<IButton> = ({
	content = '',
	css = '',
	onClick,
	type,
	disabled = false,
	href,
	as = 'a',
}) => {
	return (
		<StyledButton
			css={`
				${css}
				${disabled
					? `color: gray;
				:hover {
					color: gray;
					cursor: not-allowed;
				}`
					: ''}
			`}
			as={as}
			href={href}
			onClick={onClick ? onClick : undefined}
			type={type}
			disabled={disabled && 'disabled'}>
			<HoverBorder hover={disabled ? false : undefined}></HoverBorder>
			{content}
		</StyledButton>
	);
};

export default Button;

interface IButton {
	content: string;
	css: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	type?: string;
	disabled?: boolean;
	href?: string;
	as: 'a' | 'button';
}
