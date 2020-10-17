/** @param {{
	note: import('../../../../static/Projects').HeroNote,
	nextNote: import('../../../../static/Projects').Note 
}} param0 */
const HeroNote = ({ note: { img = khala, title, url } }) => {
	return (
		<HeroNoteWrapper>
			<HeroImg src={img}></HeroImg>
		</HeroNoteWrapper>
	);
};

var HeroNoteWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

var HeroImg = styled.img`
	max-width: 100%;
	max-height: 80vh;
`;

HeroNote.propTypes = {
	note: PropTypes.object,
	nextNote: PropTypes.object,
};

export default HeroNote;

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { khala } from 'pictures';
