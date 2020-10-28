import { css } from '@emotion/core';
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import styled from '@emotion/styled';
import React, { useContext } from 'react';
import HoverBorder from '../../components/HoverBorder';
import FormInputCss from './FormInputCss';
import SelectContext from './SelectContext';

const StyledOption = styled.div`
	${FormInputCss};
	position: relative;
	--padding: 1em;
	--margin: 2em;
	padding: var(--padding);
	max-height: calc(var(--padding) * 2 + var(--font-size));
	margin-bottom: var(--margin);
	box-sizing: border-box;
	transition: transform 250ms ease-in-out, opacity 250ms ease-in-out;
	${({ index, open, selected, selectedIndex = 4 }) => {
		let delay = 250 * Math.max(1, Math.abs(index - selectedIndex));
		return `
			z-index: ${!open && !selected ? 0 : 1};
			opacity: ${!open && !selected ? 0 : 1};
			transition: transform ${delay}ms ease-in-out, opacity ${delay}ms ease-in-out;
			transform: ${
				// prettier-ignore
				!open && !selected
					? `translateY(calc(-100% * ${index - selectedIndex} - var(--margin) * ${
							index - selectedIndex
						}));
						`
					: 'translateY(0)'
			};
			${
				!open
					? `transition: transform ${delay}ms ease-in-out ${2000}ms, opacity ${delay}ms ease-in-out ${2000}ms;`
					: ''
			}
		`;
	}};
	${({ customCss }) => customCss}
`;

/** @param {import('./Select').Option} param0 */
const Option = ({ txt, value, customCss, index = 0, action }) => {
	const context = useContext(SelectContext);
	const { dispatch, open, selected, selectedIndex } = context;
	return (
		<>
			<StyledOption
				onClick={() =>
					dispatch(
						action ? action : { type: 'select', selected: value, selectedIndex: index }
					)
				}
				open={open}
				selected={selected === value}
				selectedIndex={selectedIndex}
				index={index}
				customCss={customCss}>
				{open && selected === value ? null : <HoverBorder />}
				{txt}
				<div
					css={css`
						position: absolute;
						top: 0;
						left: 100%;
						z-index: 10;
					`}>
					{JSON.stringify({ open, selected: value === selected })}
				</div>
			</StyledOption>
		</>
	);
};

export default Option;
