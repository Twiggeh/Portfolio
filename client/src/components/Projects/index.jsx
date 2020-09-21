const ProjectsPage = () => {
	return (
		<div>
			<MainContent
				title='Replay Bot'
				subTitle='Functionally written, stateless, Discord Bot.'
				features={ReplayBotData.features}
				buttons={ReplayBotData.buttons}
			/>
		</div>
	);
};

export default ProjectsPage;

import React from 'react';
import { ReplayBotData } from '../../../public/static/Projects.js';
import MainContent from '../components/MainContent/MainContent.jsx';
