/** @param {{
						data:import('../../../static/Projects').Content
  					}} param0 */
const NewSidebarContent = ({
	data: { title, cover = khala, subTitle, buttons, notes, descPage },
}) => {
	const { setModal } = useContext(ModalContext);
	// TODO: finish btnIcon support & btnName as hover
	if (!title) return null;
	return (
		<div>
			{buttons === undefined ? null : (
				<SideBtnWrap>
					{buttons.map(
						({ btnIcn, btnIcnFallback, btnName, btnUrl, svg: SVG, modal }, i) => (
							<SideButton
								key={i}
								href={btnUrl}
								onClick={e => {
									if (modal) {
										e.preventDefault();
										setModal(modal);
									}
								}}>
								{SVG ? <SVG /> : btnIcn}
							</SideButton>
						)
					)}
				</SideBtnWrap>
			)}
			<SideWrapper href={descPage}>
				<HoverBorder />
				<SideImgContainer>
					<SideImg src={cover} />
				</SideImgContainer>
				<SideTitle>{title}</SideTitle>
				<SideSubTitle>{subTitle}</SideSubTitle>
			</SideWrapper>
		</div>
	);
};

const transitionTime = '100ms';

var SideImgContainer = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity ${transitionTime} ease-in;
		background-image: linear-gradient(rgba(255, 105, 180, 0.3), 10%, transparent);
	}
	:hover::before {
		opacity: 1;
	}
`;

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
	position: relative;
	flex-direction: column;
	margin-top: 4vh;
	${styles.outline};
	background-color: ${colors.darkestInfill};
	text-decoration: none;
	:hover {
		color: hotpink;
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

NewSidebarContent.propTypes = {
	data: PropTypes.object,
};

export default NewSidebarContent;

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colors, fontSizes, styles } from '../../../styles/globalStyle';
import { useContext } from 'react';
import ModalContext from '../../Providers/modalProvider';
import { khala } from 'pictures';
import HoverBorder from '../HoverBorder';
