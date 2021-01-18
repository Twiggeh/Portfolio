const mq = queries.mainQueries;
const bottomLine = `
	${styles.customOutline(0, 0, 1)}
	padding-top: clamp(30px, 4vw, 40px);
	padding-right: clamp(40px, 6vw, 60px);
	padding-bottom: clamp(30px, 4vw, 40px);
	padding-left: clamp(40px, 6vw, 60px);
`;

interface IMainContent {
	data: Content;
}

const MainContent: React.FC<IMainContent> = ({
	data: { title, subTitle, notes, buttons, id },
}) => {
	return (
		<Main id={id}>
			<MainHeadWrap>
				<MainTitleWrap buttons={!!buttons}>
					<MainTitle>{title}</MainTitle>
					<MainSubtitle>{subTitle}</MainSubtitle>
				</MainTitleWrap>
				{buttons ? <MediumButtons buttons={buttons} css={bottomLine} /> : null}
			</MainHeadWrap>
			<NoteRenderer notes={notes} />
		</Main>
	);
};

import styled from '@emotion/styled';

var MainTitle = styled.h1`
	font-weight: 700;
	font-size: clamp(35px, 3vw, 60px);
	letter-spacing: 0.05em;
`;

var MainSubtitle = styled.h2`
	font-weight: 300;
	letter-spacing: 0.145em;
	padding-top: 0.5em;
	font-size: clamp(20px, 2vw, 35px);
`;

var MainTitleWrap = styled.div<{ buttons: boolean }>`
	padding-top: clamp(30px, 4vw, 40px);
	padding-bottom: clamp(30px, 4vw, 40px);
	padding-right: ${styles.contentPaddingSides};
	padding-left: ${styles.contentPaddingSides};
	${({ buttons }) => styles.customOutline(0, buttons ? 1 : 0, 1)};
	${[mq[1]]} {
		${styles.customOutline(0, 0, 1)};
	}
	flex-grow: 9;
`;

var MainHeadWrap = styled.div`
	display: flex;
	align-content: center;
	align-items: stretch;
	${[mq[1]]} {
		flex-direction: column;
	}
`;

var Main = styled.article`
	background: ${colors.darkestInfill};
	overflow: hidden;
	margin-top: 4rem;
	max-width: 65vw;
	${styles.outline};
	${[mq[0]]} {
		max-width: var(--trueWidth);
		${styles.customOutline(1, 0, 1, 1)}
	}
`;

export default MainContent;

import React from 'react';
import { colors, queries, styles } from '../../../styles/globalStyle';
import NoteRenderer from './components/NoteRenderer';
import MediumButtons from '../../MediumButtons';
import { ModalContext } from '../../../App';
import { Content } from '../../../static/Projects';
/** @typedef {{
	data: import('../../../static/Projects.js').Content
}} MainContentInput
*/

/**
 * @typedef {number} Tablet - The tablet breakpoint in px
 * @typedef {number} Phone - The phone breakpoint in px
 * @type {[Tablet, Phone]} - The breakpoints accessible with [0] or [1]
 */
