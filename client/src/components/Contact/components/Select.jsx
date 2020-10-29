import styled from '@emotion/styled';
import React, { useReducer } from 'react';
import Option from './Option';
import OptionList from './OptionList';
import SelectContext from './SelectContext';

const defaultOption = {
	txt: 'Please Select A Subject',
	value: 'please select',
};

const options = [
	{ txt: 'Build my Idea !', value: 'software' },
	{ txt: 'I want you to paint something !', value: 'art' },
	{
		txt: 'I want to know how to create Illustrations !',
		value: 'art training',
	},
	{
		txt: 'I want help with the software that I am writing !',
		value: 'software training',
	},
	{ txt: 'Other ...', value: 'other' },
];

/** @type {import('./SelectContext').SelectState} */
const selectInit = {
	open: false,
	initial: true,
	selected: defaultOption.value,
};

const StyledSelect = styled.div`
	position: relative;
	${({ open }) => {}}
`;

const Select = () => {
	/** @param {import('./SelectContext').SelectState} state
	 *  @param {OptionActions} action
	 */
	const selectReducer = (state, action) => {
		switch (action.type) {
			case 'toggle': {
				return { ...state, open: !state.open };
			}
			case 'select': {
				const data = {
					...state,
					selected: action.selected,
					selectedIndex: action.selectedIndex,
					open: !state.open,
					initial: false,
				};
				return data;
			}
			default:
				throw new Error('error');
		}
	};

	const [state, dispatch] = useReducer(selectReducer, selectInit);

	return (
		<SelectContext.Provider
			value={{
				dispatch,
				initial: state.initial,
				open: state.open,
				selected: state.selected,
				selectedIndex: state.selectedIndex,
			}}>
			<StyledSelect>
				<OptionList options={options} />
				{!state.open && state.initial ? (
					<Option
						txt={defaultOption.txt}
						value={defaultOption.value}
						action={{ type: 'toggle' }}
					/>
				) : null}
			</StyledSelect>
		</SelectContext.Provider>
	);
};

export default Select;

/**
 *
 * @typedef {{type: "select", selected: String, selectedIndex: Number}} SelectAction
 * @typedef {{type: "toggle"}} ToggleAction
 * @typedef {ToggleAction | SelectAction} OptionActions
 *
 * @typedef Option
 * @prop {string} value - The value of the actual Option element
 * @prop {string} txt - The displayed text of the actual Option element
 * @prop {number} [index=0] - The index of the Option Element
 * @prop {number} [listLength=1]
 * @prop {OptionActions} [action=SelectAction] - Optional Action for the element
 * @prop {import('@emotion/core').SerializedStyles} [customCss] - Custom Css
 */
