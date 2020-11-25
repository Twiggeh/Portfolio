import styled from '@emotion/styled';
import React, { useContext, useEffect, useState } from 'react';
import { fontSizes } from '../../../styles/globalStyle';
import Button from '../../components/MainContent/components/components/Button';
import FlashMessagesContext from '../../FlashMessage/FlashMessagesContext';
import AnimatorData from './components/AnimatorContext';
import Title from './components/Title';
import useAnimator from './components/useAnimator';
import FormInputCss from './FormInputCss';
import useFetch from './hooks/useFetch';
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

const validateEMail = email => {
	// eslint-disable-next-line security/detect-unsafe-regex
	const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return res.test(String(email).toLowerCase());
};

const Form = () => {
	const { animStore, animate, getCss } = useAnimator(initAnimStore);

	const { setFlashMessages } = useContext(FlashMessagesContext);

	const [formState, _setFormState] = useState({
		subject: '',
		email: '',
		message: '',
	});
	const setFormState = (name, value) => _setFormState(c => ({ ...c, [name]: value }));
	const [sendMsgDep, sendMsg] = useState(0);

	// TODO webpack prod doesnt inject variables
	const BACKEND_URL = "https://www.twiggeh.xyz";

	// eslint-disable-next-line no-undef
	const result = useFetch(`${BACKEND_URL}/api/v1/submit`, {
		fetchOptions: {
			method: 'POST',
			body: JSON.stringify(formState),
			headers: { 'Content-Type': 'application/json' },
			mode: 'cors',
		},
		hookOptions: { dep: sendMsgDep, condition: sendMsgDep },
		callbacks: {
			successCb: () => {
				sendMsg(0);
				_setFormState({ subject: '', email: '', message: 'Message received!' });
			},
			failCb: () => {
				sendMsg(0);
				_setFormState({
					subject: '',
					email: '',
					message: 'Message was not received ;_;',
				});
			},
		},
	});

	useEffect(() => {
		let message;

		if (result.loading)
			message = { message: 'Sending Message', type: 'Warning', uuid: result.uuid };

		if (result.res)
			message = {
				message: result.res?.message,
				type: 'Success',
				uuid: result.uuid,
			};

		if (result.error)
			message = {
				message: result.res?.message,
				type: 'Failure',
				uuid: result.uuid,
			};

		if (message === undefined) return;

		setFlashMessages(cur => {
			const index = cur.findIndex(({ uuid }) => uuid === result.uuid);

			if (index === -1) return [...cur, message];

			cur[Number(index)] = { ...message, index };
			return [...cur];
		});
	}, [result.res, result.error, result.loading, result.uuid]);

	return (
		<AnimatorData.Provider value={{ animStore, animate, getCss }}>
			<FormWrap>
				<Title>Contact me</Title>
				<Label htmlFor='email' key='Email'>
					Email
				</Label>
				<WrapInHover key='HoverWrapEmail'>
					<Input
						key='ContactEmailInput'
						type='email'
						value={formState.email}
						onChange={({ target: { value } }) => setFormState('email', value)}
						required
					/>
				</WrapInHover>
				<Label htmlFor='subject' key='HoverWrapSubject'>
					Subject
				</Label>
				<Select setFormState={setFormState} />
				<Label htmlFor='message' key='LabelMessage' customCss={getCss('bSel')}>
					Message
				</Label>
				<WrapInHover key='HoverWrapMessage' customCss={getCss('bSel')}>
					<TextArea
						key='ContactMessageTextArea'
						name='message'
						value={formState.message}
						onChange={({ target: { value } }) => setFormState('message', value)}
					/>
				</WrapInHover>
				<Button
					content='Send'
					disabled={Object.keys(formState).reduce((acc, curKey) => {
						const condition =
							curKey === 'email'
								? !validateEMail(formState.email)
								: formState[String(curKey)] === '';
						return acc === true || condition;
					}, false)}
					customCss={`
						width: 100%;
						${getCss('bSel')}
					`}
					onClick={e => {
						e.preventDefault();
						sendMsg(c => (c += 1));
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
