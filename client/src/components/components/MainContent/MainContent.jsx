/* eslint-disable indent */
/**
 * @typedef {object} note - Notes are the messages attached
 * @prop {string} notes.title - The title of the sidebar header
 * @prop {string} notes.img - The path relative to src to get to the image / url
 * @prop {string} notes.alt - The fallback path relative to src to get to the image / url
 * @prop {string} notes.text - The small description of the feature
 * @prop {string} notes.btnUrl - The url of the bigger description of the feature
 * @prop {"hero" | "feature" | "video"} feature.type - Whether the feature is a hero type or a feature type. Affects rendering.
 *
 * @typedef {object} button
 * @prop {string} button.btnName - The name of the buttons feature
 * @prop {string} button.btnUrl - The url the button points to
 * @prop {string} button.btnIcn - The path relative to src to get to the image / url
 * @prop {string} button.btnIcnFallback - The fallback path relative to src to get to the image / url
 * @prop {JSX.Element} button.svg - The svg icon for the button
 * @prop {import("../../Modals/modal_index").Modal} [button.modal] - A modal that can pop up if defined
 *
 * @param {{notes: note[]}} param0
 */

/**
 * @typedef {number} Tablet - The tablet breakpoint in px
 * @typedef {number} Phone - The phone breakpoint in px
 * @type {[Tablet, Phone]} - The breakpoints accessible with [0] or [1]
 */
const mq = queries.mainQueries;

const MainContent = ({ data: { title, subTitle, notes, buttons } }) => {
	const { setModal } = useContext(ModalContext);

	/** @param {note[]} notes*/
	const getFeatures = notes => {
		const featureList = notes.map((note, i) => {
			const { title, img = './static/khala_close.jpg', alt, text, btnUrl } = note;
			return (
				<FeatureWrap key={i}>
					<a href={btnUrl}>
						<FeatureTitle>{title}</FeatureTitle>
					</a>
					<FeatureContentWrap>
						<FeatureImg src={img} alt={alt} />
						<FeatureDescBtnWrap>
							<FeatureDesc>{text}</FeatureDesc>
							<Button href={btnUrl}>More</Button>
						</FeatureDescBtnWrap>
					</FeatureContentWrap>
					<Separator />
				</FeatureWrap>
			);
		});
		return featureList;
	};

	/** @param {button[]} buttons*/
	const getBtns = buttons => {
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

	return (
		<Main>
			<MainHeaderWrapper>
				<MainTitleWrapper>
					<MainTitle>{title}</MainTitle>
					<MainSubtitle>{subTitle}</MainSubtitle>
				</MainTitleWrapper>
				{getBtns(buttons)}
			</MainHeaderWrapper>
			{getFeatures(notes)}
		</Main>
	);
};

MainContent.propTypes = {
	data: {
		notes: PropTypes.exact({
			title: PropTypes.string.isRequired,
			img: PropTypes.string.isRequired,
			alt: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
		}),
		title: PropTypes.string,
		subTitle: PropTypes.string,
		buttons: PropTypes.exact([
			{
				btnName: PropTypes.string.isRequired,
				btnLink: PropTypes.string.isRequired,
				btnIcn: PropTypes.string.isRequired,
				btnIcnFallback: PropTypes.string.isRequired,
			},
		]),
	},
};
export default MainContent;

import { css } from '@emotion/core';
import styled from '@emotion/styled';

var ButtonS = css`
	font-family: ${fonts.mainFont};
	color: ${colors.whiteText};
	text-align: center;
	padding-top: 1em;
	padding-bottom: 1em;
	padding-left: 1.7em;
	padding-right: 1.7em;
	background-color: ${colors.darkestInfill};
	letter-spacing: 0.265em;
	&:hover {
		svg {
			fill: hotpink;
		}
		color: hotpink;
	}
	font-size: max(calc(${fontSizes.text} - 0.3rem), 16px);
	${styles.outline};
`;

var Button = styled.button`
	${ButtonS}
`;

var MainTitle = styled.h1`
	font-weight: 700;
	font-size: clamp(35px, 3vw, 60px);
	letter-spacing: 0.145em;
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

var FeatureTitle = styled.h1`
	font-weight: 700;
	font-size: ${fontSizes.mainNoteTitle};
	letter-spacing: 0.2rem;
	padding-top: 3.2rem;
	padding-bottom: 2.2rem;
`;

var FeatureDesc = styled.div`
	margin-bottom: 1rem;
	font-size: ${fontSizes.text};
	letter-spacing: 0.165rem;
	font-weight: 400;
	line-height: 1.5;
	margin-top: -0.35em;
`;

var FeatureDescBtnWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	padding-left: 2.5rem;
	padding-right: 3rem;
	flex: 0 1 auto;
	${[mq[1]]} {
		padding-left: 0;
		padding-right: 0;
		padding-top: 2rem;
		min-width: 90%;
	}
`;

var FeatureImg = styled.img`
	width: clamp(200px, 30%, 600px);
	height: clamp(calc(200px * 0.5625), calc(30% * 0.5625), calc(600px * 0.5625));
	${[mq[1]]} {
		width: 100%;
		height: calc(30% * 0.5625);
	}
`;

var FeatureContentWrap = styled.div`
	display: flex;
	padding-bottom: 1.5rem;
	${[mq[1]]} {
		flex-wrap: wrap;
	}
`;

var FeatureWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: ${globalStyle.styles.contentPaddingSides};
	padding-right: ${globalStyle.styles.contentPaddingSides};
	overflow: hidden;
	:nth-child(even) > ${FeatureContentWrap} {
		div {
			padding-left: 0;
		}
		flex-direction: row-reverse;
	}
`;

	${styles.customOutline(1)};
	width: 100vw;
	align-self: center;
`;

var VertSeparator = styled.div`
	height: 100vh;
	${styles.customOutline(0, 1)};
`;

var Main = styled.article`
	background: ${colors.darkestInfill};
	margin-top: 4rem;
	max-width: 65vw;
	${styles.outline};
	${[mq[0]]} {
		max-width: var(--trueWidth);
		${styles.customOutline(1, 0, 1, 1)}
	}
	${globalStyle.styles.outline};
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
	${globalStyle.styles.outline};
	:not(:first-child) {
		${globalStyle.styles.customOutline(0, 1, 1, 1)};
	}
	padding: 0;
	height: max(2.5em, 3vw);
	display: flex;
	align-items: center;
	overflow: hidden;
	&:nth-child(even) {
		flex-direction: row-reverse;
	}
	${[mq[1]]} {
		border: 0;
		padding-top: 1rem;
		padding-bottom: 1rem;
		& > div {
			margin-left: 0;
			border: 0;
		}
		&:nth-child(even) {
			flex-direction: row;
		}
	}
`;

var ButtonListButton = styled.div`
	margin-left: 2rem;
	margin-right: 2rem;
`;

var ButtonIconWrap = styled.div`
	width: max(2vw, 20px);
	padding: 1em;
`;

import React from 'react';
import PropTypes from 'prop-types';
import {
	colors,
	fonts,
	fontSizes,
	queries,
	styles,
} from '../../../styles/globalStyle.js';
import { useContext } from 'react';
import ModalContext from '../../Providers/modalProvider.jsx';
