/** @type {Content} */
const ReplayBotData = {
	title: 'Replay Bot',
	subTitle: 'Functionally written, stateless, Discord Bot.',
	descPage: './replaybot',
	buttons: [
		{
			btnName: 'Github',
			btnUrl: 'https:github.com/Twiggeh',
			svg: svgs.newGitLogo,
			modal: {
				content: (
					<div css={{ padding: '1em', paddingTop: '0' }}>
						<h1 css={{ fontSize: '2em', paddingBottom: '1em', fontWeight: 500 }}>
							Currently not available
						</h1>
						<article css={{ fontSize: '1.2em' }}>
							Will become available once all payments by the client have been made.
						</article>
					</div>
				),
				css: {
					display: 'flex',
					alignItems: 'flex-start',
					flexDirection: 'row-reverse',
				},
			},
		},
		{
			btnName: 'Hosted',
			svg: svgs.newDiscordLogo,
			btnUrl: 'https:discord.gg/f5gQQPP',
		},
	],
	notes: [
		{
			title: 'Stateless',
			type: 'feature',
			text:
				'Stateless operation not only makes the bot more resilient, it allows for easy scaling, a seamless user experience and a faster development cycle.',
		},
		{
			title: 'Scalability and Performance',
			type: 'feature',
			text:
				'Vertical Scaling is very easy due to the stateless nature. Functions running on each request are de-branched for maximum performance.',
		},
		{
			title: 'Data Aggregation',
			type: 'feature',
			text:
				'Provides meaningful insight into the coaches performance and students behaviour, assisting management in making unbiased decisions.',
		},
		{
			title: 'Clean, Straightforward UI',
			type: 'feature',
			text:
				'Familiarity and ease of use through implementation of common Discord Bot patterns.',
		},
	],
};

/** @type {Content} */
const Jessie = {
	title: 'Jane',
	subTitle: 'Digital Painting from imagination',
	cover: './static/Art/Portraits/Jessie/lowResJane.jpg',
	notes: [
		{
			type: 'feature',
			btnUrl: './static/Art/Portraits/Jessie/normalResJane.jpg',
			btnText: 'Download',
			precedence: 'img',
			img: './static/Art/Portraits/Jessie/normalResJane.jpg',
			text:
				'This painting took me a week to complete. Without reference means that the entire face is made up - painted from imagination. Drawn in Krita, on a Wacom 13HD.',
		},
	],
};

/** @type {Content} */
const Esmeralda = {
	title: 'Esmeralda',
	subTitle: 'Digital Portrait Painting',
	cover: './static/Art/Portraits/Esmeralda/lowResEsmeralda.webp',
	buttons: [
		{
			svg: svgs.reference,
			btnName: 'Reference',
			btnUrl: './static/Art/Portraits/Esmeralda/reference.png',
		},
	],
	notes: [
		{
			type: 'feature',
			btnUrl: './static/Art/Portraits/Esmeralda/mediumResEsmeralda.webp',
			btnText: 'Download',
			precedence: 'img',
			img: './static/Art/Portraits/Esmeralda/mediumResEsmeralda.webp',
			text: 'A one day painting exercise, origin of the reference is unknown.',
		},
		{
			type: 'video',
			title: 'Speedpaint',
			text: 'Fast-forwarded recording of the painting process',
			aspect: 16 / 9,
			base: '40vw',
			src: 'https://www.youtube-nocookie.com/embed/Gl6COzf3YjE',
		},
	],
};

/** @type {Content} */
const RoyalBird = {
	title: 'Royal Bird',
	subTitle: 'Character Bust',
	cover: './static/Art/Creatures/RoyalBird/lowResRoyalBird.webp',
	descPage: './art#royalBird',
	notes: [
		{
			type: 'feature',
			btnUrl: './static/Art/Creatures/RoyalBird/mediumResRoyalBird.webp',
			btnText: 'Download',
			precedence: 'img',
			img: './static/Art/Creatures/RoyalBird/mediumResRoyalBird.webp',
			text: '35min Speed Painting, pushing my rendering ability beyond its limits',
		},
	],
};

export const projects = [ReplayBotData];
export const art = [Jessie, Esmeralda, RoyalBird];
export default { art, projects };
import React from 'react';
import { svgs } from '../styles/globalStyle';

/**
 * @typedef {object} FeatureNote - Notes are the messages attached
 * @prop {string} [FeatureNote.title] - The title of the feature
 * @prop {"img" | "text"} [FeatureNote.precedence="text"] - The element to take precedence over the other elements
 * @prop {string} FeatureNote.img - The path relative to src to get to the image / url
 * @prop {string} FeatureNote.alt - The fallback path relative to src to get to the image / url
 * @prop {string} [FeatureNote.text] - The small description of the feature
 * @prop {string} [FeatureNote.btnUrl] - The url of the bigger description of the feature
 * @prop {string} [FeatureNote.btnText] - The text of the button
 * @prop {"feature"} FeatureNote.type - The type of the feature
 *
 * @typedef {object} DescriptionNote - Notes are the messages attached
 * @prop {string} [DescriptionNote.title] - The title of the description
 * @prop {string} [DescriptionNote.btnUrl] - The Url to more information / other stuff
 * @prop {string} [DescriptionNote.btnText] - The text of the button
 * @prop {string} DescriptionNote.text - Description
 * @prop {"description"} DescriptionNote.type - The type of the feature
 *
 * @typedef {object} HeroNote - Notes are the messages attached
 * @prop {string} HeroNote.img - The path relative to src to get to the image / url
 * @prop {string} [HeroNote.title] - Title to be displayed
 * @prop {string} HeroNote.url - The url of when a user clicks on the hero
 * @prop {"hero"} HeroNote.type - The type of the feature
 *
 * @typedef {object} VideoNote - Notes are the messages attached
 * @prop {string} VideoNote.src - The url of the video
 * @prop {string} [VideoNote.base="30vw"] - The base width of the iframe should take up. 
 * @prop {number} [VideoNote.aspect=16/9] - The aspect ratio of the iframe. 
 * @prop {string} [VideoNote.title] - Title to be displayed
 * @prop {string} [VideoNote.text] - The description for the video  
 * @prop {"video" } VideoNote.type - The type of the feature
 *
 * @typedef {
			FeatureNote
			| DescriptionNote
			| HeroNote
			| VideoNote
		} Note
 * 
 * @typedef {object} Button
 * @prop {string} button.btnName - The name of the buttons feature
 * @prop {string} button.btnUrl - The url the button points to
 * @prop {string} button.btnIcn - The path relative to src to get to the image / url
 * @prop {string} button.btnIcnFallback - The fallback path relative to src to get to the image / url
 * @prop {JSX.Element} button.svg - The svg icon for the button
 * @prop {import('../components/Modals/modal_index').Modal} [button.modal] - A modal that can pop up if defined
 *
 * @typedef {{
	notes     : Note[]
	buttons   : Button[],
	title     : string,
	subTitle  : string,
	cover: string,
	descPage: string,
	}} Content
 */
