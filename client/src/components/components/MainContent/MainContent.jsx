const mq = queries.mainQueries;

/** @param {MainContentInput} param0 */
const MainContent = ({ data: { title, subTitle, notes, buttons } }) => {
	const { setModal } = useContext(ModalContext);
	return (
		<Main>
			<MainHeaderWrapper>
				<MainTitleWrapper>
					<MainTitle>{title}</MainTitle>
					<MainSubtitle>{subTitle}</MainSubtitle>
				</MainTitleWrapper>
				{buttons ? getBtns(buttons, setModal) : null}
			</MainHeaderWrapper>
			<NoteRenderer notes={notes} />
		</Main>
	);
};

MainContent.propTypes = {
	data: PropTypes.exact({
		descPage: PropTypes.string,
		cover: PropTypes.string,
		notes: PropTypes.array,
		title: PropTypes.string,
		subTitle: PropTypes.string,
		buttons: PropTypes.arrayOf(
			PropTypes.exact({
				btnName: PropTypes.string.isRequired,
				btnUrl: PropTypes.string.isRequired,
				btnIcn: PropTypes.string,
				svg: PropTypes.object,
				modal: PropTypes.object,
			})
		),
	}),
};
export default MainContent;

import styled from '@emotion/styled';

/**
 * @param {button[]} buttons
 * @param {function} setModal
 */
var getBtns = (buttons, setModal) => {
	const formatButton = (btnName, svg = false, btnImg = false, btnImgAlt = false) => {
		if (svg || btnImg || btnImgAlt) {
			return (
				<>
					<ButtonIconWrap>
						{svg ? svg : <img src={btnImg} alt={btnImgAlt} />}
					</ButtonIconWrap>
					<VertSeparator />
					<ButtonListButton>{btnName}</ButtonListButton>
				</>
			);
		}
		return <ButtonListButton>{btnName}</ButtonListButton>;
	};

	const buttonList = buttons.map((button, i) => {
		const { btnName, btnUrl, btnIcn, btnIcnFallback, modal, svg = false } = button;
		return (
			<ButtonListWrapper
				key={i}
				href={btnUrl}
				onClick={e => {
					if (modal) {
						e.preventDefault();
						setModal(modal);
					}
				}}>
				{formatButton(btnName, svg, btnIcn, btnIcnFallback)}
			</ButtonListWrapper>
		);
	});

	return <ButtonList>{buttonList}</ButtonList>;
};

var MainTitle = styled.h1`
	font-weight: 700;
	font-size: clamp(35px, 3vw, 60px);
	letter-spacing: 0.05em;
`;

var MainSubtitle = styled.h2`
	font-weight: 300;
	letter-spacing: 0.145em;
	padding-top: 0.5em;
	font-size: clamp(20px, 2vw, 35px);
`;

var MainTitleWrapper = styled.div`
	padding-top: clamp(30px, 4vw, 40px);
	padding-bottom: clamp(30px, 4vw, 40px);
	padding-right: ${styles.contentPaddingSides};
	padding-left: ${styles.contentPaddingSides};
	${styles.customOutline(0, 1, 1)};
	${[mq[1]]} {
		${styles.customOutline(0, 0, 1)};
	}
	flex-grow: 9;
`;

var MainHeaderWrapper = styled.div`
	display: flex;
	align-content: center;
	align-items: stretch;
	${[mq[1]]} {
		flex-direction: column;
	}
`;

var VertSeparator = styled.div`
	height: 100vh;
	${styles.customOutline(0, 1)};
`;

var Main = styled.article`
	background: ${colors.darkestInfill};
	overflow: hidden;
	margin-top: 4rem;
	max-width: 65vw;
	${styles.outline};
	${[mq[0]]} {
		max-width: var(--trueWidth);
		${styles.customOutline(1, 0, 1, 1)}
	}
`;

var ButtonList = styled.section`
	display: flex;
	flex-grow: 0;
	flex-direction: column;
	justify-content: center;
	padding-top: clamp(30px, 4vw, 40px);
	padding-bottom: clamp(30px, 4vw, 40px);
	padding-left: clamp(40px, 6vw, 60px);
	padding-right: clamp(40px, 6vw, 60px);
	${styles.customOutline(0, 0, 1)};
	${[mq[1]]} {
		flex-direction: row;
		justify-content: space-between;
		padding-top: 0;
		padding-bottom: 0;
	}
`;

var ButtonListWrapper = styled.a`
	${ButtonS};
	text-decoration: none;
	:not(:first-of-type) {
		margin-top: -1px;
	}
	padding: 0;
	height: max(2.5em, 3vw);
	display: flex;
	align-items: center;
	overflow: hidden;
	:nth-of-type(even) {
		flex-direction: row-reverse;
	}
	:hover {
		border-color: hotpink;
		z-index: 1;
		div {
			border-color: hotpink;
		}
	}
	${[mq[1]]} {
		border: 0 !important;
		margin: 0 !important;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		:hover {
			div {
				border-color: ${colors.grayBorder};
			}
		}
	}
`;

var ButtonListButton = styled.div`
	margin-left: 2rem;
	margin-right: 2rem;
	${[mq[1]]} {
		margin-left: 1rem;
		margin-right: 1rem;
	}
`;

var ButtonIconWrap = styled.div`
	width: max(2vw, 20px);
	padding: 1em;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { colors, queries, styles } from '../../../styles/globalStyle.js';
import { useContext } from 'react';
import ModalContext from '../../Providers/modalProvider.jsx';
import NoteRenderer from './components/NoteRenderer.jsx';
import ButtonS from './components/components/ButtonStyle.js';

/** @typedef {{
	data: {
		title: string,
		subTitle: string,
		notes: note[],
		buttons: button[]
	}
}} MainContentInput */

/**
 * @typedef {number} Tablet - The tablet breakpoint in px
 * @typedef {number} Phone - The phone breakpoint in px
 * @type {[Tablet, Phone]} - The breakpoints accessible with [0] or [1]
 */
