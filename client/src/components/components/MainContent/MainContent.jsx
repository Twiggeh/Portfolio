/* eslint-disable indent */
/**
 * @typedef {object} feature
 * @prop {string} feature.title - The title of the sidebar header
 * @prop {string} feature.img - The path relative to src to get to the image / url
 * @prop {string} feature.alt - The fallback path relative to src to get to the image / url
 * @prop {string} feature.text - The small description of the feature
 * @prop {string} feature.btnUrl - The url of the bigger description of the feature
 *
 * @typedef {object} button
 * @prop {string} button.btnName - The name of the buttons feature
 * @prop {string} button.btnUrl - The url the button points to
 * @prop {string} button.btnIcn - The path relative to src to get to the image / url
 * @prop {string} button.btnIcnFallback - The fallback path relative to src to get to the image / url
 * @prop {JSX.Element} button.svg - The svg icon for the button
 * @prop {import("../../Modals/modal_index").Modal} [button.modal] - A modal that can pop up if defined
 *
 * @param {{features: feature[]}} param0
 */

/**
 * @typedef {number} Tablet - The tablet breakpoint in px
 * @typedef {number} Phone - The phone breakpoint in px
 * @type {[Tablet, Phone]} - The breakpoints accessible with [0] or [1]
 */
const mq = globalStyle.queries.mainQueries;

const MainContent = ({ title, subTitle, features, buttons }) => {
	const { setModal } = useContext(ModalContext);

	/** @param {feature[]} features*/
	const getFeatures = features => {
		const featureList = features.map((feature, i) => {
			const { title, img = './static/khala_close.jpg', alt, text, btnUrl } = feature;
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
					</FeatureContentWrap>{' '}
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
			{getFeatures(features)}
		</Main>
	);
};

MainContent.propTypes = {
	features: PropTypes.exact({
		title: PropTypes.string.isRequired,
		img: PropTypes.string.isRequired,
		alt: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
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
};
export default MainContent;

import { css } from '@emotion/core';
import styled from '@emotion/styled';

var ButtonS = css`
	font-family: ${globalStyle.fonts.mainFont};
	color: ${globalStyle.colors.whiteText};
	text-align: center;
	padding-top: 1em;
	padding-bottom: 1em;
	padding-left: 1.7em;
	padding-right: 1.7em;
	background-color: ${globalStyle.colors.darkestInfill};
	letter-spacing: 0.265em;
	&:hover {
		svg {
			fill: hotpink;
		}
		color: hotpink;
	}
	font-size: max(calc(${globalStyle.styles.text} - 0.3rem), 16px);
	${globalStyle.styles.outline};
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
	padding-right: ${globalStyle.styles.contentPaddingSides};
	padding-left: ${globalStyle.styles.contentPaddingSides};
	${globalStyle.styles.customOutline(0, 1, 1)};
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
	font-size: ${globalStyle.styles.midtitleFontSize};
	letter-spacing: 0.2rem;
	padding-top: 3.2rem;
	padding-bottom: 2.2rem;
`;

var FeatureDesc = styled.div`
	margin-bottom: 1rem;
	font-size: ${globalStyle.styles.text};
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

var Separator = styled.div`
	${globalStyle.styles.customOutline(1)};
	width: 100vw;
	align-self: center;
`;

var VertSeparator = styled.div`
	height: 100vh;
	${globalStyle.styles.customOutline(0, 1)};
`;

var Main = styled.article`
	background: ${globalStyle.colors.darkestInfill};
	margin-top: 4rem;
	max-width: 65vw;
	${[mq[0]]} {
		max-width: 100%;
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
	${globalStyle.styles.customOutline(0, 0, 1)};
	${[mq[1]]} {
		flex-direction: row;
		justify-content: space-between;
		padding-top: 0;
		padding-bottom: 0;
	}
`;

var ButtonListWrapper = styled.a`
	${ButtonS};
	padding: 0;
	height: calc(1rem + 2vw);
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
import globalStyle from '../../../styles/globalStyle.js';
import { useContext } from 'react';
import ModalContext from '../../Providers/modalProvider.jsx';
