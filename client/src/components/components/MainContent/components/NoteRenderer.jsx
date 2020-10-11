/**
 * @param {{notes: import('../../../../static/Projects').Note[]}} param0
 */
const NoteRenderer = ({ notes }) => {
	let reverse = false;

	const checkPrevReverse = i => {
		const prevType = notes[i - 1]?.type;
		if (prevType === 'feature' || prevType === 'video') reverse = !reverse;
	};

	const checkNextReverse = i => {
		const nextType = notes[i + 1]?.type;
		if (nextType !== 'feature' && nextType !== 'video') reverse = false;
	};

	const result = [];
	notes.forEach((note, i) => {
		switch (note.type) {
			case 'feature': {
				checkPrevReverse(i);
				result.push(<FeatureNote note={note} key={i} renderReverse={reverse} />);
				checkNextReverse(i);
				break;
			}
			case 'video': {
				checkPrevReverse(i);
				result.push(<VideoNote note={note} key={i} reverse={reverse} />);
				checkNextReverse(i);
				break;
			}
			case 'description': {
				result.push(<DescriptionNote note={note} key={i} />);
				break;
			}
			case 'hero': {
				result.push(<HeroNote note={note} key={i} />);
				break;
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
import VideoNote from './VideoNote';

export var Separator = styled.div`
	${styles.customOutline(1)};
	width: 200vw;
	margin-left: -50vw;
	align-self: center;
`;
