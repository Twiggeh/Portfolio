/**
 * @param {{notes: import('../../../../static/Projects').Note[]}} param0
 */
const NoteRenderer = ({ notes }) => {
	let renderReverse = false;
	const result = [];
	notes.forEach((note, i) => {
		switch (note.type) {
			case 'feature': {
				if (notes[Math.max(0, i - 1)]?.type === 'feature') renderReverse = !renderReverse;
				result.push(<FeatureNote note={note} key={i} renderReverse={renderReverse} />);
				if (notes[Math.max(0, i + 1)]?.type !== 'feature') renderReverse = false;
				break;
			}
			case 'description': {
				result.push(<DescriptionNote note={note} key={i} />);
				break;
			}
			case 'hero': {
				result.push(<HeroNote note={note} key={i} />);
			}
		}
		if (i + 1 !== notes.length) result.push(<Separator key={i + '1'} />);
	});
	return <NoteWrapper>{result}</NoteWrapper>;
};
var NoteWrapper = styled.div`
	margin-left: ${styles.contentPaddingSides};
	margin-right: ${styles.contentPaddingSides};
`;

NoteRenderer.propTypes = {
	notes: PropTypes.array,
};

export default NoteRenderer;

import React from 'react';
import PropTypes from 'prop-types';
import FeatureNote from './FeatureNote';
import styled from '@emotion/styled';
import { styles } from '../../../../styles/globalStyle';
import DescriptionNote from './DescriptionNote';
import HeroNote from './HeroNote';

export var Separator = styled.div`
	${styles.customOutline(1)};
	width: 200vw;
	margin-left: -50vw;
	align-self: center;
`;
