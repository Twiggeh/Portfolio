/**
 * @typedef {{
					notes  : import("../components/components/MainContent/MainContent").note[], 
					buttons   : import("../components/components/MainContent/MainContent").button[],
					title     : string,
					subTitle  : string,
					cover: string,
					descPage: string,
					}} Content
 */
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
			title: 'Description',
			type: 'description',
			text:
				'This painting took me a week to complete. Without reference means that the entire face is made up - painted from imagination. Drawn in Krita, on a Wacom 13HD.',
		},
		{
			title: 'Recording',
			type: 'Hero',
			text: 'This will have a video in it.',
		},
	],
};

/** @type {Content[]} */
export const projects = [ReplayBotData];
export const art = [Jessie];
export default { art, projects };
import React from 'react';
import { svgs } from '../styles/globalStyle';
