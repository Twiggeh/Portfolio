import styled from '@emotion/styled';
import React from 'react';
import { colors, queries, styles } from '../styles/globalStyle';
import HoverBorder from './components/HoverBorder';
import ButtonS from './components/MainContent/components/components/ButtonStyle';
import { Button } from '../static/Projects';
import { ModalContext } from '../App';

const mq = queries.mainQueries;

const VertSepColor = () => (
	<>
		<ColorSep id='VertColorSep'></ColorSep>
		<VertSep id='VertSep'></VertSep>
	</>
);

const MediumButtons: React.FC<{
	buttons: Button[];
	css: string;
}> = ({ buttons, css }) => {
	const formatButton = (
		btnName: string,
		SVG?: React.FC<React.SVGProps<SVGSVGElement>>
	) => {
		if (!SVG) return <BtnListBtn>{btnName}</BtnListBtn>;
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
				<BtnIcoWrap>{<SVG />}</BtnIcoWrap>
				<VertSepColor />
				<BtnListBtn>{btnName}</BtnListBtn>
			</>
		);
	};

	const { setModal } = ModalContext();

	const btnList = buttons.map(({ btnName, btnUrl, modal, svg }, i) => {
		return (
			<BtnListWrap
				key={i}
				href={btnUrl}
				onClick={e => {
					if (modal) {
						e.preventDefault();
						setModal(modal);
					}
				}}>
				{formatButton(btnName, svg)}
			</BtnListWrap>
		);
	});

	return <BtnList css={css}>{btnList}</BtnList>;
};

var BtnList = styled.section<CustomCSS>`
	display: flex;
	flex-grow: 0;
	flex-direction: column;
	justify-content: center;
	${[mq[1]]} {
		flex-direction: row;
		justify-content: space-between;
		padding-top: 0;
		padding-bottom: 0;
	}
	${({ css }) => css}
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

export default MediumButtons;
