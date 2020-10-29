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
	${({ index, open, selected, selectedIndex, length }) => {
		selectedIndex = selectedIndex ? selectedIndex : length;
		const dur = 250 * Math.max(1, Math.abs(index - selectedIndex));
		const closeDel = 250 * (length - 1 - Math.abs(index - selectedIndex));
		return `
			z-index: ${!open && !selected ? 0 : 1};
			opacity: ${!open && !selected ? 0 : 1};
			transition: transform ${dur}ms ease-in-out, opacity ${dur}ms ease-in-out;
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
					? `transition: transform ${dur}ms ease-in-out ${closeDel}ms, opacity ${dur}ms ease-in-out ${closeDel}ms;`
					: ''
			}
		`;
	}};
	${({ customCss }) => customCss}
`;

/** @param {import('./Select').Option} param0 */
const Option = ({ txt, value, customCss, index = 0, listLength = 1, action }) => {
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
				customCss={customCss}
				length={listLength}>
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
