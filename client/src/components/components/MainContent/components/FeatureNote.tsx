const mq = queries.mainQueries;

type Precedence = Extract<Note, { type: 'feature' }>['precedence'];

const FeatureMediaCss = (precedence: Precedence) => `
	align-self: flex-start;
	width: max(300px, ${precedence === 'text' ? '20vw' : '40vw'});
	${[mq[1]]} {
		width: 100%;
	}`;

const StyledVideo = styled.video<{ precedence: Precedence }>(({ precedence }) =>
	FeatureMediaCss(precedence)
);

interface INoteVideo {
	src: string;
	alt: string;
	precedence: Precedence;
}

const NoteVideo: React.FC<INoteVideo> = ({ src, alt, precedence }) => {
	return (
		<StyledVideo precedence={precedence} controls loop>
			<source src={src} type='video/mp4'></source>
		</StyledVideo>
	);
};

const ImgModalCss = {
	modalCss: `
		display: flex;
		flexDirection: row-reverse;
		padding: 0;
		img: {
			maxHeight: 'calc(100vh * 0.8)';
			maxWidth: 'calc(100vw *0.8)';
		}
	`,
	closeBtnCss: `
		padding: 1rem;
	`,
};

interface IFeatureNote {
	note: Extract<Note, { type: 'feature' }>;
	prevType?: Note['type'];
	renderReverse: boolean;
}

const FeatureNote: React.FC<IFeatureNote> = ({
	note: { title, src = khala, alt, text, btnUrl, btnText = 'More', precedence = 'text' },
	renderReverse,
}) => {
	const getExt = (str?: string) => str && str.split('.').pop();

	const imgExt = ['png', 'gif', 'webp'];
	const extension = getExt(src);
	const isImg: boolean | undefined = extension ? imgExt.includes(extension) : undefined;

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
					<NoteVideo {...{ precedence }} src={src} alt={alt} />
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

var FeatureImg = styled.img<{ precedence: Precedence }>(
	({ precedence }) => `${FeatureMediaCss(precedence)};
	cursor: pointer;`
);

var FeatureContentWrap = styled.div<{ reverse: boolean }>`
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

export default FeatureNote;

import styled from '@emotion/styled';
import React from 'react';
import { queries } from '../../../../styles/globalStyle';
import Button from './components/Button';
import Description from './components/Description';
import Title from './components/Title';
import { ModalContext } from '../../../../App';
import { Note } from '../../../../static/Projects';
import { khala } from '../../../../static/Pictures';
