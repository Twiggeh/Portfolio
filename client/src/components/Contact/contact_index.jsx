import styled from '@emotion/styled';
import React from 'react';
import { fontSizes, queries, styles, svgs } from '../../styles/globalStyle';
import MediumButtons from '../MediumButtons';
import Title from './components/components/Title';
import Form from './components/Form';
import CV from 'assets/cv website/CV_Twiggeh.pdf';

const mq = queries.mainQueries;

const buttons = [{ svg: svgs.Download, btnName: 'Download', btnUrl: CV }];

const Contact = () => {
	return (
		<ContactWrap>
			<Form />
			<div>
				<Title>About me</Title>
				<TextBlock>
					Hi I&apos;m Twig and I debranch code. Puns aside I love to create art and
					software.
					<br />
					<br />I like to focus on high fidelity Characters and Splash Art. My preferred
					language is javascript, no matter whether its in the browser or on the server.
					<br />
					<br />I use Node, React, MongoDB and Express.
				</TextBlock>
				<Title>Curriculum Vitae</Title>
				<MediumButtons
					buttons={buttons}
					customCss={`margin-bottom: 2.5rem;${styles.outline}`}
				/>
			</div>
		</ContactWrap>
	);
};

// TODO : Add picture of cv to href

var TextBlock = styled.div`
	font-size: ${fontSizes.text};
	margin-bottom: 2.5rem;
`;

var ContactWrap = styled.div`
	display: flex;
	margin: ${styles.contentPaddingSides};
	& > * {
		margin-right: 10vw;
	}
	${[mq[0]]} {
	}
	${mq[1]} {
		width: 92%;
		margin-top: 7rem;
		flex-wrap: wrap-reverse;
	}
`;

export default Contact;
