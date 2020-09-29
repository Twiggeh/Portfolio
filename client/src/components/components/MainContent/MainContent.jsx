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

const ButtonS = {
	fontFamily: globalStyle.fonts.mainFont,
	color: globalStyle.colors.whiteText,
	textDecoration: 'underline',
	textDecorationColor: globalStyle.colors.whiteText,
	textAlign: 'center',
	paddingTop: '1em',
	paddingBottom: '1em',
	paddingLeft: '1.7em',
	paddingRight: '1.7em',
	backgroundColor: globalStyle.colors.darkestInfill,
	...globalStyle.styles.outline,
	letterSpacing: '0.265em',
	'&:hover': {
		color: 'hotpink',
	},
};

/**
 * @typedef {number} Tablet - The tablet breakpoint in px
 * @typedef {number} Phone - The phone breakpoint in px
 * @type {[Tablet, Phone]} - The breakpoints accessible with [0] or [1]
 */
const mq = [1400, 700].map((query) => `@media (max-width: ${query}px)`);
const MainContent = ({ title, subTitle, features, buttons }) => {
	const { setModal } = useContext(ModalContext);

	/** @param {feature[]} features*/
	const getFeatures = (features) => {
		const imgMinWidth = '200px',
			imgMaxWidth = '600px';
		const featureList = features.map((feature, i) => {
			const { title, img = './static/khala_close.jpg', alt, text, btnUrl } = feature;
			return (
				<div key={i}>
					<a href={btnUrl}>
						<h1
							css={{
								fontWeight: 700,
								fontSize: 'clamp(30px, 3vw, 47px)',
								letterSpacing: '0.165em',
								padding: '2.5rem',
							}}>
							{title}
						</h1>
					</a>
					<div
						css={{
							display: 'flex',
							paddingLeft: '2.5rem',
							...globalStyle.styles.customOutline(0, 0, 1),
							paddingBottom: '1.5rem',
							[mq[1]]: {
								flexWrap: 'wrap',
							},
						}}>
						<img
							src={img}
							alt={alt}
							css={{
								width: `clamp(${imgMinWidth}, 30%, ${imgMaxWidth})`,
								height: `clamp(calc(${imgMinWidth} * 0.5625), calc(30% * 0.5625), calc(${imgMaxWidth} * 0.5625))`,
								[mq[1]]: {
									width: '90%',
									height: 'calc(30% * 0.5625)',
									marginRight: '2.5rem',
								},
							}}
						/>
						{/* Text and Button*/}
						<div
							css={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								justifyContent: 'space-between',
								paddingLeft: '1rem',
								paddingRight: '3rem',
								flex: ['0', '1', 'auto'],
								[mq[1]]: {
									paddingLeft: '0',
									paddingTop: '2rem',
									minWidth: '90%',
								},
							}}>
							<div
								css={{
									marginBottom: '1rem',
									fontSize: 'clamp(20px, 2vw, 25px)',
									letterSpacing: '0.265rem',
									fontWeight: 400,
									lineHeight: '1.5',
									marginTop: '-.35em',
								}}>
								{text}
							</div>
							<a css={{ ...ButtonS, fontSize: 'clamp(14px, 1.5vw, 22px)' }} href={btnUrl}>
								More
							</a>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div
				css={{
					'& > div:nth-child(even) > div': {
						flexDirection: 'row-reverse',
						div: {
							paddingLeft: 0,
						},
					},
				}}>
				{featureList}
			</div>
		);
	};
	const getBtns = (buttons) => {
		const buttonList = buttons.map((button, i) => {
			const { btnName, btnUrl, btnIcn, btnIcnFallback, modal, svg = false } = button;
			return (
				<a
					key={i}
					href={btnUrl}
					onClick={
						// prettier-ignore
						modal ? 
						e => {
								e.preventDefault();
								setModal(modal);
						}
						: () => {}
					}>
				</a>
			);
		});
		return (
			<section
				css={{
					display: 'flex',
					flexGrow: 0,
					flexDirection: 'column',
					justifyContent: 'center',
					paddingTop: '   clamp(30px, 4vw, 40px)',
					paddingBottom: 'clamp(30px, 4vw, 40px)',
					paddingLeft: ' clamp(40px, 6vw, 60px)',
					paddingRight: 'clamp(40px, 6vw, 60px)',
					...globalStyle.styles.customOutline(0, 0, 1),
				}}>
				{buttonList}
			</section>
		);
	};

	return (
		<article
			css={{
				background: globalStyle.colors.darkestInfill,
				marginTop: '4rem',
				maxWidth: '65vw',
				[mq[0]]: {
					maxWidth: '100%',
				},
				...globalStyle.styles.outline,
			}}>
			<div
				css={{
					display: 'flex',
					alignContent: 'center',
					alignItems: 'stretch',
				}}>
				<div
					css={{
						paddingTop: '   clamp(30px, 4vw, 40px)',
						paddingBottom: 'clamp(30px, 4vw, 40px)',
						paddingRight: '2.5rem',
						paddingLeft: '2.5rem',
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
							paddingTop: '0.5em',
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
import globalStyle from '../../../styles/globalStyle';
