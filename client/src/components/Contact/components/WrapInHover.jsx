import { css } from '@emotion/core';
import React, { useState } from 'react';
const WrapInHover = ({ children }) => {
	const [hover, setHover] = useState(false);
	return (
		<div
			css={css`
				position: relative;
			`}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}>
			{children}
			<HoverBorder hover={hover} />
		</div>
	);
};
WrapInHover.propTypes = {
	children: PropTypes.any,
};

export default WrapInHover;

import HoverBorder from '../../components/HoverBorder';
import PropTypes from 'prop-types';
