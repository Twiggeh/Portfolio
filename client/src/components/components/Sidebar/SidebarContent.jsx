/** @param {{
						data:import('../../../static/Projects').Content
  					}} param0 */
const SidebarContent = ({
	data: { title, cover = './static/khala_close.jpg', subTitle, buttons, notes, descPage },
}) => {
	const { setModal } = useContext(ModalContext);
	// TODO: finish btnIcon support & btnName as hover
	if (!title) return null;
	return (
		<div>
			{buttons === undefined ? null : (
				<SideBtnWrap>
					{buttons.map(({ btnIcn, btnIcnFallback, btnName, btnUrl, svg, modal }, i) => (
						<SideButton
							key={i}
							href={btnUrl}
							onClick={e => {
								if (modal) {
									e.preventDefault();
									setModal(modal);
								}
							}}>
							{svg ? svg : btnIcn}
						</SideButton>
					))}
				</SideBtnWrap>
			)}
			<SideWrapper href={descPage}>
				<div css={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
					<GradientSvg>
						{GradientDef}
						<GradientRect></GradientRect>
					</GradientSvg>
					<SideImg src={cover} />
				</div>
				<SideTitle>{title}</SideTitle>
				<SideSubTitle>{subTitle}</SideSubTitle>
			</SideWrapper>
		</div>
	);
};

var GradientSvg = styled.svg`
	height: 100%;
	width: 100%;
	position: absolute;
`;

var GradientRect = styled.rect`
	display: none;
	width: 100%;
	height: 100%;
	fill: ${'url(#pinkGrad)'};
`; //TODO : change the fill variable in hover to a new gradient

var GradientDef = (
	<defs>
		<linearGradient id={'pinkGrad'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
			<stop offset={'0%'} css={{ stopColor: 'hotpink', stopOpacity: 0.5 }} />
			<stop offset={'100%'} css={{ stopOpacity: 0 }} />
		</linearGradient>
		<linearGradient id={'darkGrad'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
			<stop offset={'0%'} css={{ stopColor: colors.darkestInfill, stopOpacity: 0.5 }} />
			<stop offset={'100%'} css={{ stopOpacity: 0 }} />
		</linearGradient>
	</defs>
);

var SideBtnWrap = styled.div`
	display: flex;
	justify-content: flex-end;
	position: absolute;
	align-items: center;
	margin-top: calc(var(--SidebarWidth) * 0.04);
	min-width: var(--SidebarWidth);
	pointer-events: none;
`;

var SideImg = styled.img`
	max-width: 100%;
	min-width: calc(100% - 2vw);
`;

var SideButton = styled.a`
	pointer-events: all;
	display: flex;
	justify-content: center;
	align-items: center;
	${styles.outline};
	svg {
		width: 2vw;
	}
	width: 2.8vw;
	height: 2.8vw;
	margin-right: 4%;
	background: ${colors.darkestInfill};
	z-index: 2;
	:hover {
		path,
		svg {
			fill: hotpink;
		}
		border-color: hotpink;
	}
`;

var SideWrapper = styled.a`
	display: flex;
	flex-direction: column;
	margin-top: 4vh;
	${styles.outline};
	background-color: ${colors.darkestInfill};
	text-decoration: none;
	:hover {
		color: hotpink;
		border-color: hotpink;
		${GradientRect} {
			display: block;
		}
	}
`;

var SideTitle = styled.h4`
	font-size: calc(${fontSizes.text} * 1.2);
	letter-spacing: 0.2em;
	text-transform: uppercase;
	margin-top: 2rem;
	margin-left: 1vw;
	margin-right: 1vw;
`;

var SideSubTitle = styled.h5`
	font-size: ${fontSizes.text};
	letter-spacing: 0.1em;
	line-height: 1.4em;
	margin-top: 0.7rem;
	margin-left: 1vw;
	margin-right: 1vw;
	margin-bottom: 0.7rem;
`;

SidebarContent.propTypes = {
	data: PropTypes.object,
};

export default SidebarContent;

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colors, fontSizes, styles } from '../../../styles/globalStyle';
import { useContext } from 'react';
import ModalContext from '../../Providers/modalProvider';
