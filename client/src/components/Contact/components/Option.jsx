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
	padding-bottom: 1em;
	${({ value, index, open, selected }) => {
		const closedCondition = !open && selected !== value;
		const persistCond = selected === value && !open;
		return `
          z-index: ${closedCondition && !persistCond ? 0 : 1};
          opacity: ${closedCondition && !persistCond ? 0 : 1};
          transform: ${
						closedCondition || persistCond
							? `translateY(calc(-100% * ${index}))`
							: 'translateY(0)'
					};
          ${persistCond ? 'margin-bottom: 0' : ''};
        `;
	}};
	// ${({ customCss }) => customCss}
`;

/** @param {import('./Select').Option} param0 */
const Option = ({ txt, value, customCss, index = 0, action }) => {
	const { dispatch, open, selected } = useContext(SelectContext);
	return (
		<StyledOption
			onClick={() => dispatch(action ? action : { type: 'select', selected: value })}
			open={open}
			selected={selected}
			value={value}
			index={index}
			customCss={customCss}>
			{open && selected === value ? null : <HoverBorder />}
			{txt}
		</StyledOption>
	);
};

export default Option;
