/* eslint-disable indent */
import React from 'react';
import { SerializedStyles } from '@emotion/core';
import { css as emotionCss } from '@emotion/react';

interface IHoverBorder {
	hoverGradient?: boolean;
	css?: SerializedStyles;
	hover?: boolean;
}

const pointerNone = emotionCss`
	pointer-events: none;
`;

const HoverBorder: React.FC<IHoverBorder> = ({ hoverGradient = false, css, hover }) => {
	return (
		<svg
			fill='url(#pinkGradient)'
			css={
				hover === undefined
					? [svgHoverStyle, css].filter(c => !!c)
					: hover === true
					? [svgStyle, svgHover, pointerNone, css].filter(c => !!c)
					: [svgStyle, pointerNone, css].filter(c => !!c)
			}>
			<line id='topLine' x1='0' y1='0' x2='100%' y2='0' />
			<line id='rightLine' x1='100%' y1='0%' x2='100%' y2='100%' />
			<line id='botLine' x1='100%' y1='100%' x2='0' y2='100%' />
			<line id='leftLine' x1='0' y1='100%' x2='0' y2='0' />
			{hoverGradient ? (
				<>
					<rect id='myRect' width='100%' height='100%' />
					<defs>
						<linearGradient id='pinkGradient' fy='90%' x1='0%' x2='0%' y1='0%' y2='100%'>
							<stop offset='0%' stopColor='hotpink' stopOpacity='0.3' />
							<stop offset='30%' stopColor='transparent' />
						</linearGradient>
					</defs>
				</>
			) : null}
		</svg>
	);
};

var getTransTime = (mag = 1, ms = 150) => `${mag * ms}ms`;

var svgHover = emotionCss`
	#myRect {
		opacity: 1;
	}
	line {
		transform: scaleX(1);
	}
	#topLine {
		transform: scaleX(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(0)};
	}
	#rightLine {
		transform-origin: top;
		transform: scaleY(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(1)};
	}
	#botLine {
		transform-origin: right;
		transform: scaleX(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(2)};
	}
	#leftLine {
		transform-origin: bottom;
		transform: scaleY(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(3)};
	}
`;

var svgStyle = emotionCss`
	#myRect {
		opacity: 0;
		transition: opacity ${getTransTime()} ease-in;
	}
	position: absolute;
	top: 0;
	left: 0;
	width: 100% !important;
	height: 100% !important;
	z-index: 1;
	line {
		stroke: hotpink;
		stroke-width: 3;
	}

	#topLine {
		transform: scaleX(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(3)};
	}
	#rightLine {
		transform-origin: top;
		transform: scaleY(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(2)};
	}
	#botLine {
		transform-origin: right;
		transform: scaleX(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(1)};
	}
	#leftLine {
		transform-origin: bottom;
		transform: scaleY(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(0)};
	}
`;

var svgHoverStyle = emotionCss`
	#myRect {
		opacity: 0;
		transition: opacity ${getTransTime()} ease-in;
		:hover {
			opacity: 1;
		}
	}
	position: absolute;
	top: 0;
	left: 0;
	width: 100% !important;
	height: 100% !important;
	z-index: 1;
	line {
		stroke: hotpink;
		stroke-width: 3;
	}
	:hover #topLine {
		transform: scaleX(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(0)};
	}
	:hover #rightLine {
		transform-origin: top;
		transform: scaleY(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(1)};
	}
	:hover #botLine {
		transform-origin: right;
		transform: scaleX(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(2)};
	}
	:hover #leftLine {
		transform-origin: bottom;
		transform: scaleY(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(3)};
	}
	:hover line {
		transform: scaleX(1);
	}
	#topLine {
		transform: scaleX(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(3)};
	}
	#rightLine {
		transform-origin: top;
		transform: scaleY(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(2)};
	}
	#botLine {
		transform-origin: right;
		transform: scaleX(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(1)};
	}
	#leftLine {
		transform-origin: bottom;
		transform: scaleY(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(0)};
	}
`;

export default HoverBorder;
