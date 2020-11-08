import styled from '@emotion/styled';
import React from 'react';
import { fontSizes, styles } from '../../../styles/globalStyle';
import Button from '../../components/MainContent/components/components/Button';
import AnimatorData from './components/AnimatorContext';
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
				<FormTitle key='FormTitle'>Contact me</FormTitle>
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

var FormTitle = styled.div`
	font-size: ${fontSizes.mainNoteTitle};
	margin-bottom: 2rem;
`;

var FormEl = styled.div`
	margin: ${styles.contentPaddingSides};
	--formWidth: 35vw;
	width: var(--formWidth);
	--padding-Option: 1rem;
	--margin-Option: 2rem;
	--font-size: calc(${fontSizes.text}*.8);
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
	font-size: ${fontSizes.text};
	font-weight: 500;
	padding-bottom: 1rem;
	position: relative;
	${({ customCss }) => customCss};
`;
