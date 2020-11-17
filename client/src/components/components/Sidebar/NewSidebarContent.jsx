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
							<SmallButton
								key={i}
								href={btnUrl}
								onClick={e => {
									if (modal) {
										e.preventDefault();
										setModal(modal);
									}
								}}
							>
								{SVG ? <SVG /> : btnIcn}
							</SmallButton>
						)
					)}
				</SideBtnWrap>
			)}
			<SideWrapper href={descPage}>
				<HoverBorder hoverGradient={true} />
				<SideImgContainer>
					<SideImg src={cover} />
				</SideImgContainer>
				<SideTitle>{title}</SideTitle>
				<SideSubTitle>{subTitle}</SideSubTitle>
			</SideWrapper>
		</div>
	);
};

var SideImgContainer = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
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

var SideWrapper = styled.a`
	display: flex;
	position: relative;
	flex-direction: column;
	margin-top: 4vh;
	${styles.outline};
	background-color: ${colors.darkestInfill};
	text-decoration: none;
	transition: color 250ms ease-in-out;
	:hover {
		color: hotpink;
	}
`;

var SideTitle = styled.h4`
	font-size: calc(${fontSizes.text} * 1.2);
	letter-spacing: 0.2em;
	text-transform: uppercase;
	margin-top: 1.5rem;
	margin-left: 1.2vw;
	margin-right: 1.2vw;
	margin-bottom: 1.2rem;
`;

var SideSubTitle = styled.h5`
	font-size: ${fontSizes.text};
	letter-spacing: 0.1em;
	line-height: 1.4em;
	margin-left: 1.2vw;
	margin-right: 1.2vw;
	margin-bottom: 1.2rem;
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
import SmallButton from '../../SmallButton';
