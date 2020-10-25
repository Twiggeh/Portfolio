import styled from '@emotion/styled';
/* eslint-disable react/prop-types */

import React, { useReducer } from 'react';
import Option from './Option';
import OptionList from './OptionList';
import SelectStateContext from './SelectStateContext';

// TODO : allow the elements to stack into the selected form.
const Select = () => {
	const StyledSelect = styled.div`
		position: relative;
	`;

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

	const [selectState, selectDispatch] = useReducer(selectReducer, selectInit);

	const select = selected => selectDispatch({ type: 'select', selected });

	// Change these to your liking. Value must be unique and must be passed to the select helper function
	/** @type {OptData[]} */
	const optData = [
		{
			onClick: () => select('software'),
			txt: 'Build my Idea !',
			value: 'software',
			state: selectState,
		},
		{
			onClick: () => select('art'),
			txt: 'I want you to paint something !',
			value: 'art',
			state: selectState,
		},
		{
			onClick: () => select('art training'),
			txt: 'I want to know how to create Illustrations !',
			value: 'art training',
			state: selectState,
		},
		{
			onClick: () => select('software training'),
			txt: 'I want help with the software that I am writing !',
			value: 'software training',
			state: selectState,
		},
		{
			onClick: () => select('other'),
			txt: 'Other ...',
			value: 'other',
			state: selectState,
		},
	];

	// TODO : Add grayed out element that is already selected
	return (
		<SelectStateContext.Provider value={{ ...selectState, selectDispatch }}>
			<StyledSelect>
				{/*<OptionList optList={optData}></OptionList>*/}
				<Option
					onClick={() => select('software')}
					txt={'Build my Idea !'}
					value={'software'}
					index={0}
				/>
				<Option
					onClick={() => select('art')}
					txt={'I want you to paint something !'}
					value={'art'}
					index={1}
				/>
				<Option
					onClick={() => select('art training')}
					txt={'I want to know how to create Illustrations !'}
					value={'art training'}
					index={2}
				/>
				<Option
					onClick={() => select('software training')}
					txt={'I want help with the software that I am writing !'}
					value={'software training'}
					index={3}
				/>
				<Option
					onClick={() => select('other')}
					txt={'Other ...'}
					value={'other'}
					index={4}
				/>

				{selectState.initial && !selectState.open ? (
					<Option
						txt={defaultOption.txt}
						value={defaultOption.value}
						onClick={() => selectDispatch({ type: 'toggle' })}
					/>
				) : null}
			</StyledSelect>
		</SelectStateContext.Provider>
	);
};

export default Select;

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
