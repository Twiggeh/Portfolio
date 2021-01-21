interface IHeroNote {
	note: Extract<Note, { type: 'hero' }>;
}
const HeroNote: React.FC<IHeroNote> = ({ note: { img = khala } }) => {
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

export default HeroNote;

import React from 'react';
import styled from '@emotion/styled';

import { Note } from '../../../../static/Projects';
import { khala } from '../../../../static/Pictures';
