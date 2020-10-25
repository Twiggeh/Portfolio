import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { fontSizes, styles } from '../../../styles/globalStyle';
import Button from '../../components/MainContent/components/components/Button';
import FormInputCss from './FormInputCss';
import Select from './Select';
import WrapInHover from './WrapInHover';

const Form = () => {
	return (
		<FormEl>
			<FormTitle>Contact me</FormTitle>
			<Label htmlFor='email'>Email</Label>
			<WrapInHover elements={<Input key='ContactEmailInput' type='email' required />} />
			<Label htmlFor='subject'>Subject</Label>
			<Select />
			<Label htmlFor='message'>Message</Label>
			<WrapInHover elements={<TextArea key='ContactMessageTextArea' name='message' />} />
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

var Input = styled.input`
	display: block;
	padding: 1rem;
	${FormInputCss}
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

var TextArea = styled.textarea`
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
