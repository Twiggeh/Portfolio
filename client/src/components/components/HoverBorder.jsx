import styled from '@emotion/styled';
import React from 'react';

const HoverBorder = () => {
	return (
		<HoverSvg>
			<TopLine x1='0' y1='0' x2='100%' y2='0' />
			<RightLine x1='100%' y1='0%' x2='100%' y2='100%' />
			<BottomLine x1='100%' y1='100%' x2='0' y2='100%' />
			<LeftLine x1='0' y1='100%' x2='0' y2='0' />
		</HoverSvg>
	);
};

var getTransTime = (mag = 1, ms = 150) => `${mag * ms}ms`;

var TopLine = styled.line``;
var BottomLine = styled.line``;
var RightLine = styled.line``;
var LeftLine = styled.line``;

var HoverSvg = styled.svg`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
	line {
		stroke: hotpink;
		stroke-width: 3;
	}
	:hover ${TopLine} {
		transform: scaleX(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(0)};
	}
	:hover ${RightLine} {
		transform-origin: top;
		transform: scaleY(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(1)};
	}
	:hover ${BottomLine} {
		transform-origin: right;
		transform: scaleX(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(2)};
	}
	:hover ${LeftLine} {
		transform-origin: bottom;
		transform: scaleY(1);
		transition: transform ${getTransTime()} ease-in ${getTransTime(3)};
	}
	:hover line {
		transform: scaleX(1);
	}
	${TopLine} {
		transform: scaleX(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(3)};
	}
	${RightLine} {
		transform-origin: top;
		transform: scaleY(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(2)};
	}
	${BottomLine} {
		transform-origin: right;
		transform: scaleX(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(1)};
	}
	${LeftLine} {
		transform-origin: bottom;
		transform: scaleY(0);
		transition: transform ${getTransTime()} ease-in ${getTransTime(0)};
	}
`;

export default HoverBorder;
