/* eslint-disable no-mixed-spaces-and-tabs */
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { FlashMessageContext } from '../../../App';
import { fontSizes } from '../../../styles/globalStyle';
import { FlashMessage } from '../../FlashMessage/FlashMessages';
import Button from '../../components/MainContent/components/components/Button';
import Title from './components/Title';
import useAnimator from './components/useAnimator';
import FormInputCss from './FormInputCss';
import useFetch from './hooks/useFetch';
import Select from './Select';
import SelectOpts from './SelectOpts';
import WrapInHover from './WrapInHover';
import type { AnimStore } from '../components/components/useAnimator';
import createCtx from '../../Providers/createCtx';

const initAnimStore: AnimStore = {
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

const [animatorDataContext, AnimatorDataProvider] = createCtx<IAnimatorDataCtx>();
export const AnimatorDataContext = animatorDataContext;

const validateEMail = (email: string) => {
	// eslint-disable-next-line security/detect-unsafe-regex
	const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return res.test(String(email).toLowerCase());
};

const Form = () => {
	const { animStore, animate, getCss } = useAnimator(initAnimStore);

	const { setFlashMessages } = FlashMessageContext();

	const [formState, _setFormState] = useState({
		subject: '',
		email: '',
		message: '',
	});

	const setFormState = (name: keyof typeof formState, value: string) =>
		_setFormState(c => ({ ...c, [name]: value }));

	const [sendMsgDep, sendMsg] = useState(0);

	// TODO webpack prod doesn't inject variables
	const BACKEND_URL = 'https://www.twiggeh.xyz';

	const result = useFetch<ContactFetch>(`${BACKEND_URL}/api/v1/submit`, {
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
		let message: FlashMessage | undefined;

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
				message: result.error,
				type: 'Failure',
				uuid: result.uuid,
			};

		setFlashMessages(cur => {
			if (message === undefined) return cur;
			const index = cur.findIndex(({ uuid }) => uuid === result.uuid);

			if (index === -1) return [...cur, message];

			cur[Number(index)] = { ...message, index };
			return [...cur];
		});
	}, [result.res, result.error, result.loading, result.uuid]);

	return (
		<AnimatorDataProvider value={{ animStore, animate, getCss }}>
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
				<Label htmlFor='message' key='LabelMessage' scss={getCss('bSel')}>
					Message
				</Label>
				<WrapInHover key='HoverWrapMessage' scss={getCss('bSel')}>
					<TextArea
						key='ContactMessageTextArea'
						name='message'
						value={formState.message}
						onChange={({ target: { value } }) => setFormState('message', value)}
					/>
				</WrapInHover>
				<Button
					as='button'
					content='Send'
					disabled={Object.keys(formState).reduce<boolean>((acc, curKey) => {
						const condition =
							curKey === 'email'
								? !validateEMail(formState.email)
								: // eslint-disable-next-line @typescript-eslint/ban-ts-comment
								  // @ts-ignore
								  formState[String(curKey)] === '';
						return acc === true || condition;
					}, false)}
					scss={`
						width: 100%;
						${getCss('bSel')}
					`}
					onClick={e => {
						e.preventDefault();
						sendMsg(c => (c += 1));
					}}
				/>
			</FormWrap>
		</AnimatorDataProvider>
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

var Label = styled.label<CustomCSS>`
	display: block;
	font-size: calc(${fontSizes.text} * 1.2);
	font-weight: 500;
	padding-bottom: calc(var(--margin-Option) * 0.5);
	position: relative;
	${({ scss }) => scss};
`;

type ContactFetch = { state: 'Success' | 'Failure'; message: string };

type IAnimatorDataCtx = ReturnType<typeof useAnimator>;
