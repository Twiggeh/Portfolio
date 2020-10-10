const mq = queries.mainQueries;

// TODO : Allow to rename the button

/** @param {{
			note: import('../../../../static/Projects').FeatureNote,
			prevType : import('../../../../static/Projects').Note["type"],
			index: number,
		}} param0 */
const FeatureNote = ({ note, renderReverse }) => {
	const {
		title,
		img = './static/khala_close.jpg',
		alt,
		text,
		btnUrl,
		precedence = 'text',
	} = note;
	return (
		<FeatureWrapper>
			{title ? (
				<a href={btnUrl}>
					<Title>{title}</Title>
				</a>
			) : null}
			<FeatureContentWrap reverse={renderReverse}>
				<FeatureImg {...{ precedence }} src={img} alt={alt} />
				<FeatureDescBtnWrap>
					{text ? <Description>{text}</Description> : null}
					{btnUrl ? <Button href={btnUrl}>More</Button> : null}
				</FeatureDescBtnWrap>
			</FeatureContentWrap>
		</FeatureWrapper>
	);
};

var FeatureWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

var FeatureDescBtnWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	padding-left: 2.5rem;
	padding-right: 3rem;
	flex: 0 1 auto;
	${[mq[1]]} {
		padding-left: 0;
		padding-right: 0;
		padding-top: 2rem;
		min-width: 90%;
	}
`;

var FeatureImg = styled.img`
	align-self: flex-start;
	width: max(300px, ${({ precedence }) => (precedence === 'text' ? '20vw' : '40vw')});
	${[mq[1]]} {
		width: 100%;
	}
`;

var FeatureContentWrap = styled.div`
	display: flex;
	margin-top: 2.2rem;
	${({ reverse }) =>
		reverse
			? `flex-direction: row-reverse;
			margin-top: 1.6rem;
			div {
				padding-left: 0;
			}`
			: `${Description} {
				margin-top: -0.35em;
			}`};
	padding-bottom: 1.5rem;
	${[mq[1]]} {
		flex-wrap: wrap;
	}
`;

FeatureNote.propTypes = {
	note: PropTypes.object,
	renderReverse: PropTypes.bool,
};

export default FeatureNote;

import styled from '@emotion/styled';
import React from 'react';
import { queries } from '../../../../styles/globalStyle';
import PropTypes from 'prop-types';
import Button from './components/Button';
import Description from './components/Description';
import Title from './components/Title';
