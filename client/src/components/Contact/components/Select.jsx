/* eslint-disable indent */
import styled from '@emotion/styled';
import React, { useContext, useReducer } from 'react';
import Option from './Option';
import OptionList from './OptionList';
import SelectContext from './SelectContext';
import AnimatorData from './components/AnimatorContext';
import SelectOpts from './SelectOpts';

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
	${({ customCss }) => customCss}
`;

const Select = () => {
	const time = 150;
	const { animate } = useContext(AnimatorData);
	/** @param {import('./SelectContext').SelectState} state
	 *  @param {OptionActions} action
	 */
	const selectReducer = (state, action) => {
		const transition = (transMul = 0, delayMul = 0) => `
				transition: transform ${transMul * time}ms ${delayMul * time}ms linear;
			`;

		const _selectedIndex = action.selectedIndex;
		const selectedIndex =
			_selectedIndex === undefined ? SelectOpts.length - 1 : _selectedIndex;

		const lengthBtm = SelectOpts.length - 1 - selectedIndex;
		const lengthTop = SelectOpts.length - 1 - lengthBtm;
		const longerLength = Math.max(lengthBtm, lengthTop);

		switch (action.type) {
			case 'toggle': {
				animate({
					type: 'setAnimation',
					key: 'bSel',
					css: `${transition};
								transform: translateY(0)`,
				});
				animate({
					type: 'setAnimation',
					key: 'Sel',
					css: `${transition};
								transform: translateY(0)`,
				});
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

				animate({
					type: 'setAnimation',
					key: 'Sel',
					css: data.open
						? `${transition(lengthTop)};
								transform: translateY(0);`
						: `${transition(selectedIndex, Math.max(lengthBtm - lengthTop, 0))};
								transform: translateY(
									calc(
										(var(--margin-Option) + var(--max-height)) * -${action.selectedIndex}
									)
								);`,
				});

				animate({
					type: 'setAnimation',
					key: 'bSel',
					css: data.open
						? `${transition(lengthTop)};
							transform: translateY(0);`
						: `${transition(longerLength)};
							transform: translateY(calc((var(--margin-Option) + var(--max-height)) * -${
								SelectOpts.length - 1
							}))
						`,
				});
				return data;
			}
			default:
				throw new Error(`${action.type} is not supported by selectReducer`);
		}
	};

	const [state, dispatch] = useReducer(selectReducer, selectInit);
	const { getCss } = useContext(AnimatorData);
	return (
		<SelectContext.Provider
			value={{
				dispatch,
				initial: state.initial,
				open: state.open,
				selected: state.selected,
				selectedIndex: state.selectedIndex,
			}}>
			<StyledSelect optLength={SelectOpts.length} customCss={getCss('Sel')}>
				<OptionList options={SelectOpts} />
				{!state.open && state.initial ? (
					<Option
						txt={defaultOption.txt}
						value={defaultOption.value}
						action={{ type: 'toggle' }}
						listLength={SelectOpts.length}
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
