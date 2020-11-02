import React, { useState } from 'react';
const WrapInHover = ({ children, customCss }) => {
	const [hover, setHover] = useState(false);
	return (
		<StyledWrapInHover
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
			customCss={customCss}>
			{children}
			<HoverBorder hover={hover} />
		</StyledWrapInHover>
	);
};
WrapInHover.propTypes = {
	children: PropTypes.any,
	customCss: PropTypes.string,
};

var StyledWrapInHover = styled.div`
	position: relative;
	${({ customCss }) => customCss}
`;

export default WrapInHover;

import HoverBorder from '../../components/HoverBorder';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
