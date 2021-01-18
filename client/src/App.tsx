import { Global, css } from '@emotion/core';
import { hot } from 'react-hot-loader/root';
import './assets/global.css';
import createCtx from './components/Providers/createCtx';

const mq = queries.mainQueries;

const [modalContext, ModalProvider] = createCtx<IModalProviderCtx>();
const [flashMessageContext, FlashMessageProvider] = createCtx<IFlashMsgProviderCtx>();

export const ModalContext = modalContext;
export const FlashMessageContext = flashMessageContext;

const App = () => {
	const [modal, setModal] = useState<Modal | undefined>(undefined);

	const [flashMessages, setFlashMessages] = useState<FlashMessage[]>([]);

	const addFlashMessages = (flash: FlashMessage[]) => {
		setFlashMessages(c => {
			return [...c, ...flash];
		});
	};

	return (
		<>
			<Global styles={globalStyle} />
			<ModalProvider value={{ modal, setModal }}>
				<FlashMessageProvider value={{ setFlashMessages, addFlashMessages }}>
					<FlashMessages
						flashMessages={flashMessages}
						setFlashMessages={setFlashMessages}
					/>
					<Modals />
					<Body />
				</FlashMessageProvider>
			</ModalProvider>
		</>
	);
};

export default hot(App);

import React, { useState } from 'react';
import Body from './components/Body/body_index';
import Modals, { Modal } from './components/Modals/modal_index';
import { queries, colors, styles } from './styles/globalStyle';
import FlashMessages, { FlashMessage } from './components/FlashMessage/FlashMessages';

var globalStyle = css`
	* {
		color: white;
		::selection {
			color: white;
			background: hotpink;
		}
		font-family: Montserrat;
		::-webkit-scrollbar-track {
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3) inset;
			${[mq[0]]} {
				${styles.customOutline(0, 0, 0, 1)}
			}
		}
		::-webkit-scrollbar {
			width: 18px;
			background-color: ${colors.bgInfill};
		}
		::-webkit-scrollbar-thumb {
			border: 1px solid ${colors.grayBorder};
			background-color: ${colors.darkestInfill};
			:hover {
				border-color: hotpink;
			}
		}
	}
	body {
		--trueWidth: 100%;
	}
`;

type IModalProviderCtx = {
	modal: Modal | undefined;
	setModal: React.Dispatch<React.SetStateAction<Modal | undefined>>;
};
type IFlashMsgProviderCtx = {
	setFlashMessages: React.Dispatch<React.SetStateAction<FlashMessage[]>>;
	addFlashMessages: (flash: FlashMessage[]) => void;
};
