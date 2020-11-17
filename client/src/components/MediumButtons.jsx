import styled from '@emotion/styled';
import React from 'react';
import { colors, queries, styles } from '../styles/globalStyle.js';
import HoverBorder from './components/HoverBorder.jsx';
import ButtonS from './components/MainContent/components/components/ButtonStyle.js';
import PropTypes from 'prop-types';

const mq = queries.mainQueries;

const VertSepColor = () => (
	<>
		<ColorSep id='VertColorSep'></ColorSep>
		<VertSep id='VertSep'></VertSep>
	</>
);

/**
 * @param {import('../static/Projects.js').Button[]} buttons
 * @param {function} setModal
 */
const MediumButtons = ({ buttons, setModal = () => {}, customCss }) => {
	const formatButton = (btnName, SVG, btnImg = false, btnImgAlt = false) => {
		if (SVG || btnImg || btnImgAlt) {
			return (
				<>
					<HoverBorder
						customCss={`
							width: calc(100% + 2px) !important;
							height: calc(100% + 2px) !important;
							top: -1px;
							left: -1px;
						`}
					/>
					<BtnIcoWrap>{SVG ? <SVG /> : <img src={btnImg} alt={btnImgAlt} />}</BtnIcoWrap>
					<VertSepColor />
					<BtnListBtn>{btnName}</BtnListBtn>
				</>
			);
		}
		return <BtnListBtn>{btnName}</BtnListBtn>;
	};
	const btnList = buttons.map(
		({ btnName, btnUrl, btnIcn, btnIcnFallback, modal, svg = false }, i) => {
			return (
				<BtnListWrap
					key={i}
					href={btnUrl}
					onClick={e => {
						if (modal) {
							e.preventDefault();
							setModal(modal);
						}
					}}
				>
					{formatButton(btnName, svg, btnIcn, btnIcnFallback)}
				</BtnListWrap>
			);
		}
	);

	return <BtnList customCss={customCss}>{btnList}</BtnList>;
};

var BtnList = styled.section`
	display: flex;
	flex-grow: 0;
	flex-direction: column;
	justify-content: center;
	padding-top: clamp(30px, 4vw, 40px);
	padding-bottom: clamp(30px, 4vw, 40px);
	padding-left: clamp(40px, 6vw, 60px);
	padding-right: clamp(40px, 6vw, 60px);
	${[mq[1]]} {
		flex-direction: row;
		justify-content: space-between;
		padding-top: 0;
		padding-bottom: 0;
	}
	${({ customCss }) => customCss}
`;

var BtnListWrap = styled.a`
	${ButtonS};
	text-decoration: none;
	:not(:first-of-type) {
		margin-top: -1px;
	}
	padding: 0;
	height: max(2.5em, 3vw);
	display: flex;
	position: relative;
	align-items: center;
	transition: color 250ms ease-in-out;
	path {
		transition: fill 250ms ease-in-out;
	}
	:hover {
		z-index: 1;
		#VertColorSep {
			transform: scaleY(1);
			transition: transform 150ms ease-in;
		}
		path {
			fill: hotpink;
		}
	}
	#VertColorSep {
		transform-origin: top;
		transition: transform 150ms ease-in 150ms;
	}
	:nth-of-type(even) {
		flex-direction: row-reverse;
		// longer duration cuz btn => | More Text | icn |
		:hover #VertColorSep {
			transition: transform 150ms ease-in calc(150ms * 0.75);
		}
		#VertColorSep {
			transition: transform 150ms ease-in 300ms;
		}
	}
	${[mq[1]]} {
		border: 0 !important;
		margin: 0 !important;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		:hover {
			div {
				border-color: ${colors.grayBorder};
			}
		}
	}
`;

var BtnListBtn = styled.div`
	margin-left: 2rem;
	margin-right: 2rem;
	${[mq[1]]} {
		margin-left: 1rem;
		margin-right: 1rem;
	}
`;

var BtnIcoWrap = styled.div`
	display: flex;
	padding: 1em;
	svg {
		width: 2em;
	}
`;

var ColorSep = styled.div`
	height: 100%;
	width: 1px;
	margin-left: -1px;
	background-color: hotpink;
	transform: scaleY(0);
	transition: transform 150ms ease-in;
`;

var VertSep = styled.div`
	height: 100%;
	${styles.customOutline(0, 1)};
`;

MediumButtons.propTypes = {
	buttons: PropTypes.array,
	setModal: PropTypes.func,
};

export default MediumButtons;
