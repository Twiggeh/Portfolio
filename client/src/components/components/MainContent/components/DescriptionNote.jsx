/** @param {{note: import('../../../../static/Projects').DescriptionNote}} param0 */
const DescriptionNote = ({ note: { title, text, btnUrl, btnText = 'More' } }) => {
	return (
		<>
			{title ? <Title>{title}</Title> : null}
			<BtnDescWrapper>
				<Description>{text}</Description>
				{btnUrl ? <Button href={btnUrl}>{btnText}</Button> : null}
			</BtnDescWrapper>
		</>
	);
};

DescriptionNote.propTypes = {
	note: PropTypes.object,
};

var BtnDescWrapper = styled.div`
	margin-top: 2em;
	margin-bottom: 2em;
	display: flex;
	align-items: flex-start;
	flex-flow: row wrap;
	${Description} {
		margin-top: -0.2em;
		margin-right: 2em;
		margin-bottom: 0;
		flex: 1 2 50%;
	}
	${[queries.mainQueries[1]]} {
		${Description} {
			margin-right: 0;
			margin-bottom: 1.5em;
		}
	}
`;

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { queries } from '../../../../styles/globalStyle';
import Button from './components/Button';
import Description from './components/Description';
import Title from './components/Title';

export default DescriptionNote;
