import React, { useState } from 'react';

const WrapInHover: React.FC<CustomCSS> = ({ children, css }) => {
	const [hover, setHover] = useState(false);
	return (
		<StyledWrapInHover
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
			css={css}>
			{children}
			<HoverBorder hover={hover} />
		</StyledWrapInHover>
	);
};

var StyledWrapInHover = styled.div<CustomCSS>`
	position: relative;
	z-index: 1;
	${({ css }) => css}
`;

export default WrapInHover;

import HoverBorder from '../../components/HoverBorder';
import styled from '@emotion/styled';
