/* eslint-disable indent */
/* eslint-disable react/prop-types */
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useContext } from 'react';
import HoverBorder from '../../components/HoverBorder';
import FormInputCss from './FormInputCss';
import SelectContext from './SelectContext';

const StyledOption = styled.div`
	${FormInputCss};
	position: relative;
	transition: transform 250ms ease-in-out, opacity 250ms ease-in-out;
	padding-bottom: 1em;
	${({ state, value, index }) => {
		const closedCondition = !state.open && state.selected !== value;
		const persistCond = state.selected === value && !state.open;
		return `
          z-index: ${closedCondition && !persistCond ? -1 : 0};
          opacity: ${closedCondition && !persistCond ? 0 : 1};
          transform: ${
						closedCondition || persistCond
							? `translateY(calc(-100% * ${index}))`
							: 'translateY(0)'
					};
          ${persistCond ? 'margin-bottom: 0' : ''};
        `;
	}};
	${({ customCss }) => customCss}
`;

const Option = ({ txt, value, customCss, index = 0, action }) => {
	const { dispatch, open, selected, initial } = useContext(SelectContext);
	const state = { open, selected, initial };
	return (
		<StyledOption
			onClick={() => dispatch(action ? action : { type: 'select', selected: value })}
			state={state}
			value={value}
			index={index}
			customCss={customCss}>
			<HoverBorder
				customCss={
					open && selected === value
						? css`
								display: none;
						  `
						: ''
				}
			/>
			{txt}
		</StyledOption>
	);
};

export default Option;
