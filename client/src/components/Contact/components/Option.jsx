import { css } from '@emotion/core';
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import styled from '@emotion/styled';
import React, { useContext } from 'react';
import HoverBorder from '../../components/HoverBorder';
import FormInputCss from './FormInputCss';
import SelectContext from './SelectContext';

const time = 200;
const StyledOption = styled.div`
	${FormInputCss};
	position: relative;
	--padding: 1em;
	--margin: 2em;
	padding: var(--padding);
	max-height: calc(var(--padding) * 2 + var(--font-size));
	margin-bottom: var(--margin);
	box-sizing: border-box;
	transition: transform ${time}ms linear, opacity ${time}ms ease-in-out;
	${({ index, open, selected, selectedIndex, length }) => {
		selectedIndex = selectedIndex === undefined ? length - 1 : selectedIndex;

		const lengthBtm = length - 1 - selectedIndex;
		const lengthTop = length - 1 - lengthBtm;
		const dist = Math.abs(selectedIndex - index);
		const dur = time * Math.max(1, dist);

		const closeDel = time * (Math.max(lengthBtm, lengthTop) - dist);

		return `
			z-index: ${!open && !selected ? 0 : 1};
			opacity: ${!open && !selected ? 0 : 1};
			transition: transform ${dur}ms ease-in-out, opacity ${time}ms ease-in-out;
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
					? `transition: transform ${dur}ms ease-in-out ${closeDel}ms, opacity ${time}ms ease-in-out ${closeDel}ms;`
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
