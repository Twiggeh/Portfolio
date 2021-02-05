/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */

const [selectContext, SelectProvider] = createCtx<ISelectProviderCtx>();
export const SelectContext = selectContext;

const Select: React.FC<ISelect> = ({ setFormState }) => {
	const time = 150;
	const { animate, getCss } = AnimatorDataContext();

	type TSelectReducer = (
		state: Omit<ISelectProviderCtx, 'dispatch'>,
		action: OptionActions
	) => Omit<ISelectProviderCtx, 'dispatch'>;

	const selectReducer: TSelectReducer = (state, action) => {
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
					key: 'Sel',
					css: `${transition(SelectOpts.length)};
								transform: translateY(calc(
										(var(--margin-Option) + var(--max-height)) * -${action.selectedIndex}
									))`,
				});
				animate({
					type: 'setAnimation',
					key: 'bSel',
					css: `${transition(SelectOpts.length)};
								transform: translateY(0)`,
				});
				return { ...state, open: !state.open, opened: true };
			}
			case 'select': {
				const data: ReturnType<typeof selectReducer> = {
					...state,
					selected: action.selected,
					selectedIndex: action.selectedIndex,
					open: !state.open,
					initial: false,
				};

				setFormState('subject', action.selected);

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
						? `${transition(longerLength)};
							transform: translateY(0);`
						: `${transition(longerLength)};
							transform: translateY(calc((var(--margin-Option) + var(--max-height)) * -${
								SelectOpts.length - 1
							}))
						`,
				});
				return data;
			}
		}
	};

	const [{ initial, open, opened, selected, selectedIndex }, dispatch] = useReducer(
		selectReducer,
		selectInit
	);

	return (
		<SelectProvider value={{ dispatch, initial, open, opened, selected, selectedIndex }}>
			<StyledSelect scss={getCss('Sel')}>
				<OptionList options={SelectOpts} defaultOption={defaultOption} opened={opened} />
			</StyledSelect>
		</SelectProvider>
	);
};

import styled from '@emotion/styled';
import React, { useReducer } from 'react';
import OptionList from './OptionList';
import SelectOpts from './SelectOpts';
import { AnimatorDataContext } from './Form';
import createCtx from '../Providers/createCtx';

var defaultOption: Option = {
	txt: 'Please Select A Subject',
	index: 0,
	listLength: 1,
	value: 'please select',
	action: { type: 'toggle' },
};

var selectInit: Omit<ISelectProviderCtx, 'dispatch'> = {
	open: false,
	opened: false,
	initial: true,
	selected: defaultOption.value,
	selectedIndex: 0,
};

var StyledSelect = styled.div<CustomCSS>`
	${({ scss }) => scss}
`;

interface ISelect {
	setFormState: (name: 'subject' | 'email' | 'message', value: string) => void;
}

type ISelectProviderCtx = {
	selected: string;
	open: boolean;
	opened: boolean;
	initial: boolean;
	selectedIndex: number;
	dispatch: React.Dispatch<OptionActions>;
};

export default Select;

export type OptionActions =
	| { type: 'select'; selected: string; selectedIndex: number }
	| { type: 'toggle'; selected?: string; selectedIndex?: number };

export type Option = {
	value: string;
	txt: string;
	index: number;
	listLength: number;
	action?: OptionActions;
	scss?: string;
};

/**
 * @typedef Option
 * @prop {string} value - The value of the actual Option element
 * @prop {string} txt - The displayed text of the actual Option element
 * @prop {number} [index=0] - The index of the Option Element
 * @prop {number} [listLength=1]
 * @prop {OptionActions} [action=SelectAction] - Optional Action for the element
 * @prop {import('@emotion/core').SerializedStyles} [customCss] - Custom Css
 */
