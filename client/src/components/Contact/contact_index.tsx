import styled from '@emotion/styled';
import React from 'react';
import { fontSizes, queries, styles, svgs } from '../../styles/globalStyle';
import MediumButtons from '../MediumButtons';
import Title from './components/components/Title';
import Form from './components/Form';
import CV from 'assets/cv website/CV_Twiggeh.pdf';

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
				<MediumButtons buttons={buttons} scss={medBtnCss} />
			</div>
		</ContactWrap>
	);
};

// TODO : Add picture of cv to href
var mq = queries.mainQueries;

var TextBlock = styled.div`
	font-size: ${fontSizes.text};
	line-height: 1.3em;
	margin-bottom: 2.5rem;
`;

var ContactWrap = styled.div`
	display: flex;
	margin: ${styles.contentPaddingSides};
	& > * {
		margin-right: 10vw;
	}
	${mq[1]} {
		margin-top: 7rem;
		flex-wrap: wrap-reverse;
		margin-right: 0;
	}
`;

var medBtnCss = `
	margin-bottom: 2.5rem;
	${[mq[1]]} {
		${styles.outline}
	}
`;

export default Contact;
