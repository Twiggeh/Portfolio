const mq = queries.mainQueries;

const FeatureMediaCss = props => `
	align-self: flex-start;
	width: max(300px, ${props.precedence === 'text' ? '20vw' : '40vw'});
	${[mq[1]]} {
		width: 100%;
	}`;

const StyledVideo = styled.video(FeatureMediaCss);

const NoteVideo = ({ src, alt, precedence }) => {
	return (
		<StyledVideo {...{ precedence }} controls loop>
			<source src={src} type='video/mp4'></source>
		</StyledVideo>
	);
};

NoteVideo.propTypes = {
	src: PropTypes.string,
	customCss: PropTypes.string,
	precedence: PropTypes.string,
	alt: PropTypes.string,
};

/** @type {import('@emotion/core').Interpolation} */
const ImgModalCss = {
	modalCss: {
		display: 'flex',
		flexDirection: 'row-reverse',
		padding: 0,
		img: {
			maxHeight: 'calc(100vh * 0.8)',
			maxWidth: 'calc(100vw *0.8)',
		},
	},
	closeBtnCss: {
		padding: '1rem',
	},
};

/** @param {{
			note: import('../../../../static/Projects').FeatureNote,
			prevType : import('../../../../static/Projects').Note["type"],
			index: number,
		}} param0 */
const FeatureNote = ({ note, renderReverse }) => {
	const {
		title,
		src = khala,
		alt,
		text,
		btnUrl,
		btnText = 'More',
		precedence = 'text',
	} = note;

	/** @param {string} str - Path */
	const getExt = str => str.split('.').pop();

	const imgExt = ['png', 'gif', 'webp'];

	const isImg = imgExt.includes(getExt(src));

	const { setModal } = ModalContext();

	return (
		<FeatureWrapper>
			{title ? <Title bigGap={!renderReverse}>{title}</Title> : null}
			<FeatureContentWrap reverse={renderReverse}>
				{isImg ? (
					<FeatureImg
						{...{ precedence }}
						src={src}
						alt={alt}
						loading='lazy'
						onClick={() =>
							setModal({ content: <img src={src} alt={alt}></img>, ...ImgModalCss })
						}
					/>
				) : (
					<NoteVideo {...{ precedence }} src={src} alt={alt} loading='lazy' />
				)}
				<FeatureDescBtnWrap>
					{text ? <Description>{text}</Description> : null}
					{btnUrl ? <Button href={btnUrl} content={btnText} /> : null}
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

var FeatureImg = styled.img(
	props => `${FeatureMediaCss(props)};
	cursor: pointer;`
);

var FeatureContentWrap = styled.div`
	display: flex;
	${({ reverse }) =>
		reverse
			? `flex-direction: row-reverse;
			div {
				padding-left: 0;
			}`
			: `${Description} {
				margin-top: -0.35em;
			}`};
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
import { khala } from 'pictures';
import { ModalContext } from '../../../../App';
