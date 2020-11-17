import styled from '@emotion/styled';
import React from 'react';
import { styles, svgs } from '../../styles/globalStyle';
import MediumButtons from '../MediumButtons';
import Title from './components/components/Title';
import Form from './components/Form';
import CV from 'assets/cv website/CV_Twiggeh.pdf';

const buttons = [{ svg: svgs.Download, btnName: 'Download', btnUrl: CV }];

const Contact = () => {
	return (
		<ConactSpacer>
			<Form />
			<div>
				<Title>Curriculum Vitae</Title>
				<MediumButtons buttons={buttons} />
			</div>
		</ConactSpacer>
	);
};

// TODO : Add picture of cv to href

const ConactSpacer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: ${styles.contentPaddingSides};
`;

export default Contact;
