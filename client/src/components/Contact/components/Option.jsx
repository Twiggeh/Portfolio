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
	transition: transform 250ms ease-in-out, opacity 250ms ease-in-out;
	--padding: 1em;
	padding: var(--padding);
	max-height: calc(var(--padding) * 2 + var(--font-size));
	margin: 0;
	box-sizing: border-box;
	${({ index, open, selected, selectedIndex: SI }) => {
		return `
          z-index: ${!open && !selected ? 0 : 1};
          opacity: ${!open && !selected ? 0 : 1};
          transform: ${
						!open && !selected
							? `translateY(calc(-100% * ${index - SI}))`
							: 'translateY(0)'
					};
					${open ? 'margin-bottom: 2em;' : ''}
        `;
	}};
	${({ customCss }) => customCss}
`;

/** @param {import('./Select').Option} param0 */
const Option = ({ txt, value, customCss, index = 0, action }) => {
	const { dispatch, open, selected, selectedIndex } = useContext(SelectContext);
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
