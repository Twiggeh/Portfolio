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
				result.push(
					<NoteSpacer key={i}>
						<FeatureNote note={note} renderReverse={reverse} />
					</NoteSpacer>
				);
				checkNextReverse(i);
				break;
			}
			case 'video': {
				checkPrevReverse(i);
				result.push(
					<NoteSpacer key={i}>
						<VideoNote note={note} reverse={reverse} />
					</NoteSpacer>
				);
				checkNextReverse(i);
				break;
			}
			case 'description': {
				result.push(
					<NoteSpacer key={i}>
						<DescriptionNote note={note} />
					</NoteSpacer>
				);
				break;
			}
			case 'hero': {
				result.push(
					<NoteSpacer key={i}>
						<HeroNote note={note} />
					</NoteSpacer>
				);
				break;
			}
		}
		if (i + 1 !== notes.length) result.push(<Separator key={i + '1'} />);
	});
	return <NoteWrapper>{result}</NoteWrapper>;
};

var NoteSpacer = styled.div`
	margin-top: 2.5rem;
	margin-bottom: 2rem;
`;

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
