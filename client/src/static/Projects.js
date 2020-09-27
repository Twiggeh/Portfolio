/**
 * @typedef {{
					features  : import("../components/components/MainContent/MainContent").feature[], 
					buttons   : import("../components/components/MainContent/MainContent").button[],
					title     : string,
					subTitle  : string,
					}} Content
 */
/** @type {Content} */
export const ReplayBotData = {
	title: 'Replay Bot',
	subTitle: 'Functionally written, stateless, Discord Bot.',
	buttons: [
		{
			btnName: 'Github',
			btnUrl: 'https:github.com/Twiggeh',
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
					button: {},
				},
			},
		},
		{
			btnName: 'Hosted',
			btnUrl: 'https:discord.gg/f5gQQPP',
		},
	],
	features: [
		{
			title: 'Stateless',
			text:
				'Stateless operation not only makes the bot more resilient, it allows for easy scaling, a seamless user experience and a faster development cycle.',
		},
		{
			title: 'Scalability and Performance',
			text:
				'Vertical Scaling is very easy due to the stateless nature. Functions running on each request are de-branched for maximum performance.',
		},
		{
			title: 'Data Aggregation',
			text:
				'Provides meaningful insight into the coaches performance and students behaviour, assisting management in making unbiased decisions.',
		},
		{
			title: 'Clean, Straightforward UI',
			text:
				'Familiarity and ease of use through implementation of common Discord Bot patterns.',
		},
	],
};

/** @type {Content[]} */
export default [ReplayBotData];
import React from 'react';