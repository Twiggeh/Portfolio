import styled from '@emotion/styled';
import React, { useReducer } from 'react';
import Option from './Option';
import OptionList from './OptionList';
import SelectContext from './SelectContext';
import PropTypes from 'prop-types';

const defaultOption = {
	txt: 'Please Select A Subject',
	value: 'please select',
};

/** @type {import('./SelectContext').SelectState} */
const selectInit = {
	open: false,
	initial: true,
	selected: defaultOption.value,
};

const StyledSelect = styled.div`
	position: relative;
	${({ customCss, optLength }) =>
		`transform: translateY(
				calc((var(--margin-Option) + var(--max-height)) * -${optLength})
			);
			${customCss};
		`};
`;

const Select = ({ options }) => {
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
			<StyledSelect optLength={options.length} customCss={''}>
				<OptionList options={options} />
				{!state.open && state.initial ? (
					<Option
						txt={defaultOption.txt}
						value={defaultOption.value}
						action={{ type: 'toggle' }}
						listLength={options.length}
					/>
				) : null}
			</StyledSelect>
		</SelectContext.Provider>
	);
};

Select.propTypes = {
	options: PropTypes.array,
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
