export type Modal = {
	content: JSX.Element;
	modalCss?: string;
	closeBtnCss?: string;
};

const Modals = () => {
	const { modal, setModal } = ModalContext();

	if (!modal) return null;

	const { modalCss, content, closeBtnCss } = modal;

	return (
		<ModalWrapper
			onClick={e => {
				e.preventDefault();
				setModal(undefined);
			}}>
			<StyledDialog css={modalCss} modal={Boolean(modal)}>
				<ModalButton
					css={closeBtnCss}
					onClick={e => {
						e.preventDefault();
						setModal(undefined);
					}}>
					{globalStyle.svgs.cross({ color: 'black' })}
				</ModalButton>
				{content}
			</StyledDialog>
		</ModalWrapper>
	);
};

var ModalWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.7);
	position: fixed;
	display: flex;
	align-items: center;
	backdrop-filter: grayscale(1) blur(1px);
`;

var StyledDialog = styled.dialog<CustomCss & { modal: boolean }>`
	position: fixed;
	display: ${props => (props.modal ? 'block' : 'none')};
	padding-top: 2em;
	border-style: solid;
	border-width: 1px;
	border-color: hotpink;
	backdrop-filter: unset;
	filter: 'drop-shadow(0 0 1em rgba(200, 63, 134, 0.6))';
`;

var ModalButton = styled.button<CustomCss>`
	padding: 0;
	border-width: 0;
	background: transparent;
	margin-top: -0.5em;
	${props => props.css}
`;

type CustomCss = {
	css?: string;
};

export default Modals;

import React from 'react';
import globalStyle from '../../styles/globalStyle';
import { ModalContext } from '../../App';
import styled from '@emotion/styled';
