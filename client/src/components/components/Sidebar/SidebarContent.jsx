import { css } from '@emotion/core';

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
			{
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
			}
			<SideWrapper href={descPage} src={cover}>
				<div
					css={css`
						position: relative;
					`}>
					<SideImg src={cover} />
				</div>
				<SideTitle>{title}</SideTitle>
				<SideSubTitle>{subTitle}</SideSubTitle>
			</SideWrapper>
		</div>
	);
};

var SideBtnWrap = styled.div`
	display: flex;
	justify-content: flex-end;
	position: absolute;
	align-items: center;
	margin-top: calc(var(--SidebarWidth) * 0.04);
	min-width: var(--SidebarWidth);
`;

var SideImg = styled.div`
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent),
		url(${({ src }) => src});
	background-size: cover;
	background-position: bottom center;
	padding-bottom: calc(100% * 0.5625);
`;

var SideButton = styled.a`
	display: flex;
	justify-content: center;
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
		${SideImg} {
			background-image: linear-gradient(to bottom, rgba(255, 50, 200, 0.3), transparent),
				url(${({ src }) => src});
		}
	}
	${SideButton}:hover {
		${SideImg} {
			background-image: url(${({ src }) => src});
		}
	}
`;

var SideTitle = styled.h4`
	font-size: calc(${fontSizes.text} * 1.2);
	letter-spacing: 0.2em;
	text-transform: uppercase;
	margin-top: 1rem;
	margin-left: 1rem;
`;

var SideSubTitle = styled.h5`
	font-size: ${fontSizes.text};
	letter-spacing: 0.1em;
	margin-top: 0.7rem;
	margin-left: 1rem;
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
