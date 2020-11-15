/** @param {{note: import('../../../../static/Projects').DescriptionNote}} param0 */
const DescriptionNote = ({ note: { title, text, btnUrl, btnText = 'More' } }) => {
	return (
		<>
			{title ? <Title>{title}</Title> : null}
			<BtnDescWrapper>
				<Description>{text}</Description>
				{btnUrl ? <Button href={btnUrl} content={btnText}></Button> : null}
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
	${Description} {
		margin-bottom: 2em;
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
