interface INoteRenderer {
	notes: Note[];
}

const NoteRenderer: React.FC<INoteRenderer> = ({ notes }) => {
	let reverse = false;

	const checkPrevReverse = (i: number) => {
		const prevType = notes[i - 1]?.type;
		if (prevType === 'feature' || prevType === 'video') reverse = !reverse;
	};

	const checkNextReverse = (i: number) => {
		const nextType = notes[i + 1]?.type;
		if (nextType !== 'feature' && nextType !== 'video') reverse = false;
	};

	const result: JSX.Element[] = [];

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

export default NoteRenderer;

import React from 'react';
import FeatureNote from './FeatureNote';
import styled from '@emotion/styled';
import DescriptionNote from './DescriptionNote';
import HeroNote from './HeroNote';
import VideoNote from './VideoNote';
import { styles } from '../../styles/globalStyle';
import { Note } from '../../static/Projects';

export var Separator = styled.div`
	${styles.customOutline(1)};
	width: 200vw;
	margin-left: -50vw;
	align-self: center;
`;
