/* eslint-disable indent */
import React from 'react';
import styled from '@emotion/styled';
import ButtonS from './ButtonStyle';
import HoverBorder from '../../../HoverBorder';

const StyledButton = styled.a<CustomCSS & { as: string; disabled: string | boolean }>`
	${ButtonS};
	${({ scss }) => scss};
`;

const Button: React.FC<IButton> = ({
	content = '',
	scss = '',
	onClick,
	type,
	disabled = false,
	href,
	as = 'a',
}) => {
	const StyledSCCS = `
		${scss}
		${
			disabled
				? `color: gray;
		      :hover {
			      color: gray;
			      cursor: not-allowed;
		      }`
				: ''
		}
	`;
	return (
		<StyledButton
			scss={StyledSCCS}
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
	scss: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	type?: string;
	disabled?: boolean;
	href?: string;
	as: 'a' | 'button';
}
