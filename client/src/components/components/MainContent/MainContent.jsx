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
const MainContent = ({ title, subTitle, features, buttons }) => {
	/**
	 * @param {feature[]} features
	 */
	const getFeatures = features => {
		return features.map((feature, i) => {
			const { title, img = './static/khala_close.jpg', alt, text, btnUrl } = feature;
			return (
				<section key={i}>
					<a href={btnUrl}>
						<h1>{title}</h1>
					</a>
					<img src={img} alt={alt} />
					<div>{text}</div>
					<a href={btnUrl}>More</a>
				</section>
			);
		});
	};

	const getBtns = buttons => {
		return buttons.map((button, i) => {
			const { btnName, btnUrl, btnIcn, btnIcnFallback } = button;
			return (
				<section key={i}>
					<a href={btnUrl}>
						<img src={btnIcn} alt={btnIcnFallback} />
						<div>{btnName}</div>
					</a>
				</section>
			);
		});
	};

	return (
		<article>
			<h1>{title}</h1>
			<h2>{subTitle}</h2>
			{getBtns(buttons)}
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
