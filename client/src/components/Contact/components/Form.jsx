import styled from '@emotion/styled';
import React from 'react';
import { fontSizes, styles } from '../../../styles/globalStyle';
import Button from '../../components/MainContent/components/components/Button';
import AnimatorData from './components/AnimatorContext';
import Title from './components/Title';
import useAnimator from './components/useAnimator';
import FormInputCss from './FormInputCss';
import Select from './Select';
import SelectOpts from './SelectOpts';
import WrapInHover from './WrapInHover';

/** @type {import('./components/components/useAnimator').AnimStore} */
const initAnimStore = {
	bSel: {
		default: `
		transform: translateY(
			calc((var(--max-height) + var(--margin-Option)) * -${SelectOpts.length - 1})
		);
	`,
	},
	Sel: {
		default: '',
	},
};

const Form = () => {
	const { animStore, animate, getCss } = useAnimator(initAnimStore);
	return (
		<AnimatorData.Provider value={{ animStore, animate, getCss }}>
			<FormWrap>
				<Title>Contact me</Title>
				<Label htmlFor='email' key='Email'>
					Email
				</Label>
				<WrapInHover key='HoverWrapEmail'>
					<Input key='ContactEmailInput' type='email' required />
				</WrapInHover>
				<Label htmlFor='subject' key='HoverWrapSubject'>
					Subject
				</Label>
				<Select key='Select' />
				<Label htmlFor='message' key='LabelMessage' customCss={getCss('bSel')}>
					Message
				</Label>
				<WrapInHover key='HoverWrapMessage' customCss={getCss('bSel')}>
					<TextArea key='ContactMessageTextArea' name='message' />
				</WrapInHover>
				<Button
					key='SubmitButton'
					content='Send'
					customCss={`
						display: block;
						${getCss('bSel')}
					`}
					onClick={e => {
						e.preventDefault();
						fetch({ type: 'POST' });
					}}
				/>
			</FormWrap>
		</AnimatorData.Provider>
	);
};

export default Form;

var Input = styled.input`
	display: block;
	padding: 1rem;
	${FormInputCss}
`;

var FormWrap = styled.form`
	--formWidth: clamp(400px, 35vw, 50vw);
	width: var(--formWidth);
	--padding-Option: max(1rem, calc(0.8 * var(--font-size)));
	--margin-Option: calc(var(--font-size) * 2);
	--font-size: calc(${fontSizes.text}*.9);
	--max-height: calc(var(--padding-Option) * 2 + var(--font-size));
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
	font-size: calc(${fontSizes.text} * 1.2);
	font-weight: 500;
	padding-bottom: calc(var(--margin-Option) * 0.5);
	position: relative;
	${({ customCss }) => customCss};
`;
