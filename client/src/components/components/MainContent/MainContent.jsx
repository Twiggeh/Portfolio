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
 *
 * @param {{features: feature[]}} param0
 */

const ButtonS = css({
	fontFamily: globalStyle.fonts.mainFont,
	color: globalStyle.colors.whiteText,
	textDecoration: 'underline',
	textDecorationColor: globalStyle.colors.whiteText,
	textAlign: 'center',
	padding: '20px',
	backgroundColor: globalStyle.colors.darkestInfill,
	...globalStyle.styles.outline,
	letterSpacing: '0.265em',
	'&:hover': {
		color: 'hotpink',
	},
});

const MainContent = ({ title, subTitle, features, buttons }) => {
	/** @param {feature[]} features*/
	const getFeatures = features =>
		features.map((feature, i) => {
			const { title, img = './static/khala_close.jpg', alt, text, btnUrl } = feature;
			return (
				<div key={i}>
					<a href={btnUrl}>
						<h1
							css={{
								fontSize: 'clamp(27px, 2vw, 50px)',
								letterSpacing: '0.165em',
								fontWeight: 700,
							}}>
							{title}
						</h1>
					</a>
					<img src={img} alt={alt} />
					<div>{text}</div>
					<a css={ButtonS} href={btnUrl}>
						More
					</a>
				</div>
			);
		});

	const getBtns = buttons => {
		const buttonList = buttons.map((button, i) => {
			const { btnName, btnUrl, btnIcn, btnIcnFallback } = button;

			return (
				<a key={i} href={btnUrl} css={{ ...ButtonS }}>
					<img src={btnIcn} alt={btnIcnFallback} />
					{btnName}
				</a>
			);
		});
		return (
			<section
				css={{
					display: 'flex',
					flexGrow: 0,
					flexDirection: 'column',
					alignContent: 'center',
				}}>
				{buttonList}
			</section>
		);
	};

	return (
		<article
			css={{
				background: globalStyle.colors.darkestInfill,
				marginTop: '4em',
				...globalStyle.styles.outline,
			}}>
			<div
				css={{
					display: 'flex',
					alignContent: 'stretch',
					alignItems: 'center',
				}}>
				<div
					css={{
						padding: '2.5em',
						...globalStyle.styles.customOutline(0, 1, 1, 0),
						flexGrow: 9,
					}}>
					<h1
						css={{
							fontWeight: 700,
							fontSize: 'clamp(35px, 3vw, 60px)',
							letterSpacing: '0.145em',
						}}>
						{title}
					</h1>
					<h2
						css={{
							fontWeight: 300,
							letterSpacing: '0.145em',
							marginTop: '0.45em',
							fontSize: 'clamp(20px, 2vw, 35px)',
						}}>
						{subTitle}
					</h2>
				</div>
				{getBtns(buttons)}
			</div>

			{getFeatures(features)}
		</article>
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

import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import globalStyle from '../../../styles/globalStyle';
