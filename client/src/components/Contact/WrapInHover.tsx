import React, { useState } from 'react';

const WrapInHover: React.FC<CustomCSS> = ({ children, scss }) => {
	const [hover, setHover] = useState(false);
	return (
		<StyledWrapInHover
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
			scss={scss}>
			{children}
			<HoverBorder hover={hover} />
		</StyledWrapInHover>
	);
};

var StyledWrapInHover = styled.div<CustomCSS>`
	position: relative;
	z-index: 1;
	${({ scss }) => scss}
`;

export default WrapInHover;

import HoverBorder from '../../components/MainContent/HoverBorder';
import styled from '@emotion/styled';
