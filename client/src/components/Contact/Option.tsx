/* eslint-disable indent */
/* eslint-disable react/prop-types */
import styled from '@emotion/styled';
import React from 'react';
import HoverBorder from '../../components/MainContent/HoverBorder';
import FormInputCss from './FormInputCss';
import { Option, SelectContext } from './Select';

type TStyledOption = {
	index: number;
	open: boolean;
	selected: boolean;
	selectedIndex: number;
	mul: number;
	dur: number;
	closeDel: number;
};

const time = 150;

const StyledOption = styled.div<TStyledOption & CustomCSS>`
	${FormInputCss};
	position: relative;
	padding: var(--padding-Option);
	max-height: var(--max-height);
	margin-bottom: var(--margin-Option);
	box-sizing: border-box;
	transition: transform ${time}ms linear, opacity ${time}ms ease-in-out;
	${({ index, open, selected, selectedIndex, mul, dur, closeDel }) => {
		return `
			z-index: ${!open && !selected ? mul : mul + 1};
			opacity: ${!open && !selected ? 0 : 1};
			transition: transform ${dur}ms linear, opacity ${dur}ms ease-in-out;
			transform: ${
				// prettier-ignore
				!open && !selected
					? `translateY(calc(${index - selectedIndex } * (-100% - var(--margin-Option) ) ));`
					: 'translateY(0)'
			};
			${
				!open
					? `transition: transform ${dur}ms linear ${closeDel}ms, opacity ${time}ms ease-in-out ${closeDel}ms;`
					: ''
			}
		`;
	}};
	${({ scss }) => scss}
`;

const Option: React.FC<Option> = ({
	txt,
	value,
	scss,
	index = 0,
	listLength = 1,
	action,
}) => {
	const { dispatch, open, selected, selectedIndex: _selectedIndex } = SelectContext();

	const selectedIndex = _selectedIndex === undefined ? 0 : _selectedIndex;

	const lengthBtm = listLength - 1 - selectedIndex;
	const lengthTop = listLength - 1 - lengthBtm;
	const dist = Math.abs(selectedIndex - index);
	const dur = time * Math.max(1, dist);
	const mul = Math.max(lengthBtm, lengthTop) - dist;
	const closeDel = time * mul;

	return (
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
			scss={scss}
			mul={mul}
			dur={dur}
			closeDel={closeDel}>
			{open && selected === value ? null : <HoverBorder />}
			{txt}
		</StyledOption>
	);
};

export default Option;
