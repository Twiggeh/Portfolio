/** @type {Content} */
const ReplayBotData = {
	id: 'replay_bot',
	title: 'Replay Bot',
	subTitle: 'Functionally written, stateless, Discord Bot.',
	descPage: './projects#replay_bot',
	cover: repThumb,
	buttons: [
		{
			btnName: 'Github',
			btnUrl: 'https:github.com/Twiggeh',
			svg: svgs.GithubLogo,
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
				modalCss: {
					display: 'flex',
					alignItems: 'flex-start',
					flexDirection: 'row-reverse',
				},
			},
		},
		{
			btnName: 'Hosted',
			svg: svgs.DiscordLogo,
			btnUrl: 'https:discord.gg/f5gQQPP',
		},
	],
	notes: [
		{
			title: 'Stateless',
			type: 'feature',
			src: ReplayBotStateless,
			text:
				'Stateless operation not only makes the bot more resilient, it allows for easy scaling, a seamless user experience and a faster development cycle.',
		},
		{
			title: 'Scalability and Performance',
			type: 'feature',
			src: repDebranch,
			text:
				'Horizontal Scaling is very easy due to the stateless nature. Functions running on each request are de-branched for maximum performance.',
		},
		{
			title: 'Data Aggregation',
			type: 'feature',
			src: repInsight,
			text:
				'Provides meaningful insight into the coaches performance and students behaviour, assisting management in making unbiased decisions.',
		},
		{
			title: 'Clean, Straightforward UI',
			src: ReplayBotUi,
			type: 'feature',
			text:
				'Familiarity and ease of use through implementation of common Discord Bot patterns.',
		},
	],
};

/** @type {Content} */
const Jane = {
	id: 'jane',
	title: 'Jane',
	subTitle: 'Digital Painting from imagination',
	descPage: './art#jane',
	cover: lowJane,
	notes: [
		{
			type: 'feature',
			btnUrl: medJane,
			btnText: 'Download',
			precedence: 'img',
			src: medJane,
			text:
				'This painting took me a week to complete. Without reference means that the entire face is made up - painted from imagination. Drawn in Krita, on a Wacom 13HD.',
		},
	],
};

/** @type {Content} */
const Esmeralda = {
	id: 'esmeralda',
	title: 'Esmeralda',
	subTitle: 'Digital Portrait Painting',
	descPage: './art#esmeralda',
	cover: lowEsmeralda,
	buttons: [
		{
			svg: svgs.Reference,
			btnName: 'Reference',
			btnUrl: refEsmeralda,
		},
	],
	notes: [
		{
			type: 'feature',
			btnUrl: medEsmeralda,
			btnText: 'Download',
			precedence: 'img',
			src: medEsmeralda,
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
	id: 'royal_bird',
	title: 'Royal Bird',
	subTitle: 'Character Bust',
	cover: lowRoyalBird,
	descPage: './art#royal_bird',
	notes: [
		{
			type: 'feature',
			btnUrl: medRoyalBird,
			btnText: 'Download',
			precedence: 'img',
			src: medRoyalBird,
			text: '35min Speed Painting, pushing my rendering ability beyond its limits',
		},
	],
};

/** @type {Content} */
const PHBird = {
	id: 'ph_bird',
	title: 'Splash Bird',
	cover: lowPHBird,
	subTitle: 'Splash Screen / Printable Design',
	descPage: './art#ph_bird',
	notes: [
		{
			type: 'feature',
			btnUrl: medPHBird,
			alt: 'Metal Bird holding a Diamond',
			text:
				'Was comissioned to create a mascot that could be used as a splash screen on digital media and merch.',
			src: medPHBird,
			btnText: 'Download',
			precedence: 'img',
		},
	],
};

export const projects = [ReplayBotData];
export const art = [Jane, Esmeralda, RoyalBird, PHBird];

/** @type {Object.<string, Content>}} */
export default { art, projects };

import React from 'react';
import { svgs } from '../styles/globalStyle';
import {
	lowEsmeralda,
	lowJane,
	lowRoyalBird,
	medEsmeralda,
	medJane,
	medRoyalBird,
	refEsmeralda,
	repDebranch,
	repInsight,
	lowPHBird,
	medPHBird,
} from './Pictures';
import { ReplayBotStateless, ReplayBotUi } from './Videos';

/**
 * @typedef {object} FeatureNote - Notes are the messages attached
 * @prop {string} [FeatureNote.title] - The title of the feature
 * @prop {"img" | "text"} [FeatureNote.precedence="text"] - The element to take precedence over the other elements
 * @prop {string} FeatureNote.src - The path to the image / video
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
	id        : String,
	notes     : Note[]
	buttons   : Button[],
	title     : string,
	subTitle  : string,
	cover: string,
	descPage: string,
	}} Content
 */
