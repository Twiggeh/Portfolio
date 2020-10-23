/* eslint-disable react/prop-types */

/* eslint-disable indent */
import { css } from '@emotion/core';

/** @param {OptData} param0 */
const Option = ({ txt, value, onClick, state, index = 0 }) => {
	const StyledOption = styled.div`
		${FormInputCss};
		position: relative;
		z-index: 0;
		transform: translateY(0);
		${({ state: { open, selected }, value, index }) => {
			if (!open && selected !== value) {
				return css`
					z-index: -1;
					transform: translateY(calc(-100% * ${index}));
					margin-bottom: 0;
				`;
			}
			if (selected === value && !open) {
				return css`
					transform: translateY(calc(-100% * ${index}));
					margin-bottom: 0;
				`;
			}
		}};
		transition: transform 250ms ease-in-out;
		padding-bottom: 1em;
	`;

	return (
		<StyledOption onClick={onClick} state={state} value={value} index={index}>
			{state.open && state.selected === value ? null : <HoverBorder />}
			{txt}
		</StyledOption>
	);
};

/**
 * @param {object} props
 * @param {OptData[]} props.optList
 */
const OptionList = ({ optList }) =>
	optList.map(({ txt, value, onClick, state }, i) => (
		<Option onClick={onClick} txt={txt} value={value} state={state} index={i} key={i} />
	));

// TODO : allow the elements to stack into the selected form.
const Select = ({ state, dispatch, optData, defaultOption }) => {
	const StyledSelect = styled.div`
		position: relative;
	`;

	// TODO : Add grayed out element that is already selected
	return (
		<StyledSelect>
			<OptionList optList={optData}></OptionList>
			{state.initial && !state.open ? (
				<Option
					txt={defaultOption.txt}
					value={defaultOption.value}
					onClick={() => dispatch({ type: 'toggle' })}
					state={state}
				/>
			) : null}
		</StyledSelect>
	);
};

const useSelect = () => {
	// Change this to change the default option. Value must be unique.
	const defaultOption = {
		txt: 'Please Select A Subject',
		value: 'please select',
	};

	const selectInit = {
		open: false,
		initial: true,
		selected: defaultOption.value,
	};

	const selectReducer = (state, action) => {
		switch (action.type) {
			case 'toggle': {
				return { ...state, open: !state.open };
			}
			case 'select': {
				return { ...state, selected: action.selected, open: !state.open, initial: false };
			}
		}
	};

	const [state, selectDispatch] = useReducer(selectReducer, selectInit);

	const select = selected => selectDispatch({ type: 'select', selected });

	// Change these to your liking. Value must be unique and must be passed to the select helper function
	/** @type {OptData[]} */
	const optData = [
		{
			onClick: () => select('software'),
			txt: 'Build my Idea !',
			value: 'software',
			state: state,
		},
		{
			onClick: () => select('art'),
			txt: 'I want you to paint something !',
			value: 'art',
			state: state,
		},
		{
			onClick: () => select('art training'),
			txt: 'I want to know how to create Illustrations !',
			value: 'art training',
			state: state,
		},
		{
			onClick: () => select('software training'),
			txt: 'I want help with the software that I am writing !',
			value: 'software training',
			state: state,
		},
		{
			onClick: () => select('other'),
			txt: 'Other ...',
			value: 'other',
			state: state,
		},
	];

	return [
		() =>
			Select({
				state: state,
				defaultOption,
				dispatch: selectDispatch,
				optData: optData,
			}),
		selectDispatch,
	];
};

export default useSelect;

Option.propTypes = {
	txt: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	state: PropTypes.object.isRequired,
	index: PropTypes.number,
};

/**
 * @typedef SelectState
 * @prop {boolean} open - Whether the Option is in the open state
 * @prop {string} selected - The selected options name
 *
 * @typedef OptData
 * @prop {function():void} onClick - The onClick handler
 * @prop {SelectState} state - The state of the Select Element
 * @prop {string} value - The value of the actual Option element
 * @prop {string} txt - The displayed text of the actual Option element
 * @prop {number} [index=0] - The index of the Option Element
 *
 */

import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import HoverBorder from '../../components/HoverBorder';
import styled from '@emotion/styled';
import FormInputCss from './FormInputCss';
