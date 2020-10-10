/** @type {Content} */
const ReplayBotData = {
	title: 'Replay Bot',
	subTitle: 'Functionally written, stateless, Discord Bot.',
	descPage: './replaybot',
	buttons: [
		{
			btnName: 'Github',
			btnUrl: 'https:github.com/Twiggeh',
			svg: svgs.githubLogo,
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
			svg: svgs.discordLogo,
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
export const Jessie = {
	// TODO : change the interface so that I can provide props and tell what component to use.
	title: 'Jane',
	subTitle: 'Digital Painting from imagination',
	descPage: './paintings/jane',
	cover: './static/Art/Portraits/Jessie/lowResJane.jpg',
	notes: [
		{
			type: 'hero',
			img: './static/Art/Portraits/Jessie/normalResJane.jpg',
		},
		{
			type: 'description',
			btnUrl: './paintings/jane',
			btnText: 'Read More',
			text:
				'This painting took me a week to complete. Without reference means that the entire face is made up - painted from imagination. Drawn in Krita, on a Wacom 13HD.',
		},
		{
			type: 'feature',
			btnUrl: './paintings/jane',
			precedence: 'img',
			img: './static/Art/Portraits/Jessie/normalResJane.jpg',
			text:
				'This painting took me a week to complete. Without reference means that the entire face is made up - painted from imagination. Drawn in Krita, on a Wacom 13HD.',
		},
	],
};

export const projects = [ReplayBotData];
export const art = [Jessie];
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
 * @prop {string} VideoNote.url - The url of the video
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
