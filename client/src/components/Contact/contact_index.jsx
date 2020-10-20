import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useReducer } from 'react';
import { colors, fontSizes, styles } from '../../styles/globalStyle';

const Contact = () => {
	const initialState = {
		open: false,
		initial: true,
		selected: 'please select',
	};
	const reducer = (state, action) => {
		switch (action.type) {
			case 'toggle': {
				return { ...state, open: !state.open };
			}
			case 'select': {
				return { ...state, selected: action.selected, open: !state.open, initial: false };
			}
		}
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	console.log('DispatchState', state);
	const selectHelp = selected => dispatch({ type: 'select', selected });
	return (
		<Form>
			<Label htmlFor='email'>Email</Label>
			<Input type='email' name='email' />
			<Label htmlFor='subject' onClick={() => dispatch({ type: 'toggle' })}>
				Subject
			</Label>
			<Select>
				<Option onClick={() => selectHelp('art')} state={state} value='art'>
					I want you to paint something !
				</Option>
				<Option onClick={() => selectHelp('software')} state={state} value='software'>
					Build my Idea !
				</Option>
				<Option
					onClick={() => selectHelp('art training')}
					state={state}
					value='art training'>
					I want to know how to create Illustrations !
				</Option>
				<Option
					onClick={() => selectHelp('software training')}
					state={state}
					value='software training'>
					I want help with the software that I am writing !
				</Option>
				<Option onClick={() => selectHelp('other')} state={state} value='other'>
					Other ...
				</Option>
				{state.initial && !state.open ? (
					<Option
						state={state}
						value='please select'
						onClick={() => dispatch({ type: 'toggle' })}>
						Please Select An Option
					</Option>
				) : null}
			</Select>
			<Label htmlFor='message'>Message</Label>
			<TextArea name='message' />
		</Form>
	);
};

const FormInputCss = css`
	margin-bottom: 1.7rem;
	padding: 1rem;
	background: ${colors.darkestInfill};
	color: white;
	${styles.outline};
	font-size: calc(${fontSizes.text}*.8);
	display: block;
	max-width: var(--formWidth);
	min-width: var(--formWidth);
	box-sizing: border-box;
`;

var Option = styled.div`
	${({ state: { open, selected }, value }) => {
		return `
    display: ${open || selected === value ? 'block' : 'none'};
  `;
	}}
	padding-bottom: 1em;
`;

var Select = styled.div``;

var Input = styled.input`
	${FormInputCss}
`;

var TextArea = styled.textarea`
	${FormInputCss}
	min-height: 25vh;
`;

var Label = styled.label`
	font-size: ${fontSizes.sideSubTitle};
	margin-bottom: 1rem;
	position: relative;
`;

var Form = styled.div`
	margin-left: ${styles.contentPaddingSides};
	margin-right: ${styles.contentPaddingSides};
	--formWidth: 35vw;
	width: var(--formWidth);
	display: flex;
	flex-direction: column;
`;

export default Contact;
