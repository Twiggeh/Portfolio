/**
 * @type {{features : import("../../src/components/components/MainContent/MainContent").feature[], 
					buttons   : import("../../src/components/components/MainContent/MainContent").button[]}}
 */
export const ReplayBotData = {
	buttons: [
		{
			btnName: 'Github',
			btnUrl: 'https:github.com/Twiggeh',
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
