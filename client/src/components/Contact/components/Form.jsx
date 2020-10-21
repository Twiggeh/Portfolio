import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect, useReducer } from 'react';
import { useState } from 'react';
import { colors, fontSizes, styles } from '../../../styles/globalStyle';
import HoverBorder from '../../components/HoverBorder';
import Button from '../../components/MainContent/components/components/Button';
import PropTypes from 'prop-types';
import { useRef } from 'react';

const Form = () => {
	const selectInit = {
		open: false,
		initial: true,
		selected: 'please select',
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
	const selectHelp = selected => selectDispatch({ type: 'select', selected });
	// TODO : Add grayed out element that is already selected
	// eslint-disable-next-line react/prop-types
	const OptionComp = ({ txt, value, onClick }) => (
		<Option onClick={onClick} state={selectState} value={value}>
			{selectState.open && selectState.selected === value ? null : <HoverBorder />}
			{txt}
		</Option>
	);

	const Input = ({ children = null }) => {
		const Input = styled.input`
			display: block;
			padding: 1rem;
			${FormInputCss}
		`;
		const Wrapper = styled.div`
			position: relative;
		`;

		const inputRef = useRef();

		return (
			<Wrapper>
				{children}
				<Input ref={inputRef}></Input>
			</Wrapper>
		);
	};

	Input.propTypes = {
		initContent: PropTypes.any,
		children: PropTypes.any,
	};

	return (
		<FormEl>
			<FormTitle>Contact me</FormTitle>
			<Label htmlFor='email'>Email</Label>
			<Input>
				<HoverBorder />
			</Input>
			<Label htmlFor='subject' onClick={() => selectDispatch({ type: 'toggle' })}>
				Subject
			</Label>
			<Select>
				<OptionComp
					onClick={() => selectHelp('art')}
					txt='I want you to paint something !'
					value='art'
				/>
				<OptionComp
					onClick={() => selectHelp('software')}
					value='software'
					txt='Build my Idea !'
				/>
				<OptionComp
					onClick={() => selectHelp('art training')}
					txt='I want to know how to create Illustrations !'
					value='art training'
				/>
				<OptionComp
					onClick={() => selectHelp('software training')}
					txt='I want help with the software that I am writing !'
					value='software training'
				/>
				<OptionComp
					onClick={() => selectHelp('other')}
					txt='Other ...'
					value='other'></OptionComp>
				{selectState.initial && !selectState.open ? (
					<OptionComp
						txt='Please Select An Option'
						value='please select'
						onClick={() => selectDispatch({ type: 'toggle' })}
					/>
				) : null}
			</Select>
			<Label htmlFor='message'>Message</Label>
			<TextArea contentEditable='true' name='message'>
				<HoverBorder />
			</TextArea>
			<Button
				content='Send'
				customCss={css`
					display: block;
				`}
			/>
		</FormEl>
	);
};

export default Form;

const FormInputCss = css`
	margin-bottom: 2rem;
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

var FormTitle = styled.div`
	font-size: ${fontSizes.mainNoteTitle};
	margin-bottom: 2rem;
`;

var FormEl = styled.div`
	margin: ${styles.contentPaddingSides};
	--formWidth: 35vw;
	width: var(--formWidth);
`;

var Option = styled.div`
	${FormInputCss};
	${({ state: { open, selected }, value }) => {
		return `
    display: ${open || selected === value ? 'block' : 'none'};
  `;
	}}
	padding-bottom: 1em;
	position: relative;
`;

var Select = styled.div``;

// Normal TextAreas cannot have children.
var TextArea = styled.div`
	${FormInputCss}
	resize: vertical;
	position: relative;
	overflow: auto;
	min-height: 25vh;
`;

var Label = styled.label`
	display: block;
	font-size: ${fontSizes.text};
	font-weight: 500;
	padding-bottom: 1rem;
	position: relative;
`;
