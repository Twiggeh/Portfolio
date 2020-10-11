import React from 'react';
import PropTypes from 'prop-types';
import Title from './components/Title';
import Description from './components/Description';
import styled from '@emotion/styled';
import { queries, styles } from '../../../../styles/globalStyle';

/** @param {{
  note: import('../../../../static/Projects').VideoNote,
  aspect: number,
  }} param0*/
const VideoNote = ({
	note: { text, title, src, aspect = 16 / 9, base = '30vw' },
	reverse = false,
}) => {
	return (
		<VidNoteWrap reverse={reverse}>
			{src ? (
				<YoutubeVideo
					allow={
						'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					}
					allowFullScreen
					src={src}
					aspect={aspect}
					base={base}
				/>
			) : null}
			<TitleTextWrap>
				{title ? <Title>{title}</Title> : null}
				{text ? <Description>{text}</Description> : null}
			</TitleTextWrap>
		</VidNoteWrap>
	);
};

var TitleTextWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-left: 3rem;
	margin-right: 2.5rem;
	flex: 1 6 auto;
	${[queries.mainQueries[1]]} {
		margin-left: 0;
		margin-right: 0;
		padding-top: 2rem;
		min-width: 90%;
	}
`;

var VidNoteWrap = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 2.5em;
	div {
		padding-left: 0;
	}
	${({ reverse }) =>
		reverse
			? `
    flex-direction: row-reverse;
    div {
      margin-left: 0;
    }`
			: `${Description} {
				margin-top: -0.35em;
			}
			${Title}{
				margin-top: -0.1em;
			}`};
	padding-bottom: 1.5rem;
	${[queries.mainQueries[1]]} {
		flex-wrap: wrap;
	}
`;

var YoutubeVideo = styled.iframe`
	${({ base, aspect }) => {
		const width = `max(${base}, 500px)`;
		return `
			width: ${width};
			height: calc(${width} * (1 / ${aspect}));
			${[queries.mainQueries[1]]} {
				width: 100%;
				height: calc((100vw - 2 * ${styles.contentPaddingSides}) * (1 /${aspect} ));
			}`;
	}}
`;

VideoNote.propTypes = {
	note: PropTypes.object,
	reverse: PropTypes.bool,
};

export default VideoNote;
