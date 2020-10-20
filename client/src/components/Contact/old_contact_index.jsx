import { css } from '@emotion/core';
import HoverBorder from '../components/HoverBorder';

const Contact = () => {
	return (
		<FormWrap>
			<Form action='./api/v1/portfolio/submit' method='post'>
				<Label htmlFor='email'>Email </Label>
				<Input type='email' name='email' id='email' />
				<Label htmlFor='subject'>Subject</Label>
				<Select name='subject' id='subject'>
					<option value='art'>I want you to paint something !</option>
					<option value='software'>Build my Idea !</option>
					<option value='art training'>
						I want to know how to create Illustrations !
					</option>
					<option value='software training'>
						I want help with the software that I am writing !
					</option>
					<option value='other'>Other ...</option>
				</Select>
				<Label htmlFor='message'>Message</Label>
				<TextArea name='message' id='message' cols='30' rows='10' />
				<Button as='button' type='submit' content='Send'></Button>
			</Form>
		</FormWrap>
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

var Select = styled.select`
	${FormInputCss}
	appearance: none;
`;

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

var Form = styled.form`
	display: flex;
	flex-direction: column;
	max-width: var(--formWidth);
`;

var FormWrap = styled.div`
	margin-left: ${styles.contentPaddingSides};
	margin-right: ${styles.contentPaddingSides};
	--formWidth: 35vw;
	width: var(--formWidth);
`;

export default Contact;

import styled from '@emotion/styled';
import React from 'react';
import { colors, fontSizes, styles } from '../../styles/globalStyle';
import Button from '../components/MainContent/components/components/Button';
