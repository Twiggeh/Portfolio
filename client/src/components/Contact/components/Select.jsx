import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useReducer } from 'react';
import Option from './Option';
import SelectContext from './SelectContext';

const defaultOption = {
	txt: 'Please Select A Subject',
	value: 'please select',
};

const selectInit = {
	open: false,
	initial: true,
	selected: defaultOption.value,
};

const StyledSelect = styled.div`
	position: relative;
`;

const Select = () => {
	const selectReducer = (state, action) => {
		switch (action.type) {
			case 'toggle': {
				return { ...state, open: !state.open };
			}
			case 'select': {
				return {
					...state,
					selected: action.selected,
					open: !state.open,
					initial: false,
				};
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
			}}>
			<StyledSelect key='select1'>
				<Option txt={'Build my Idea !'} value={'software'} index={0} key='op0' />
				<Option
					txt={'I want you to paint something !'}
					value={'art'}
					index={1}
					key='op1'
				/>
				<Option
					txt={'I want to know how to create Illustrations !'}
					value={'art training'}
					index={2}
					key='op2'
				/>
				<Option
					txt={'I want help with the software that I am writing !'}
					value={'software training'}
					index={3}
					key='op3'
				/>
				<Option txt={'Other ...'} value={'other'} index={4} key={'op4'} />

				<Option
					txt={defaultOption.txt}
					value={defaultOption.value}
					action={{ type: 'toggle' }}
					customCss={
						!state.open && state.initial
							? ''
							: css`
									display: none;
							  `
					}
					key={'initOp'}
				/>
			</StyledSelect>
		</SelectContext.Provider>
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
