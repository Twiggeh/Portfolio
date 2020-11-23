/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

const bounceAnim = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }
  
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  
  70% {
    transform: translate3d(0, -15px, 0);
  }
  
  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const slideDownAnim = keyframes`
  from, 0%, to {
    transform: translateY(0)
  }
  100% {
    transform: translateY(-100%);
  }
`;

const lookup = {
	Success: {
		color: 'cornflowerblue',
		animation: slideDownAnim,
		timing: '1s ease 1',
	},
	Warning: { color: 'chocolate', animation: bounceAnim, timing: '1s ease infinite' },
	Failure: { color: 'crimson', animation: bounceAnim, timing: '1s ease infinite' },
};

/**
 * @param {{flashMessages: FlashMessage[]}} param0
 */
const FlashMessages = ({ flashMessages }) => {
  if (flashMessages.length === 0) return null;
  // TODO: Add max & min duration for the animations
	return (
		<>
			{flashMessages.map(({ delay = 0, uuid, message, type, fillMode = 'none' }, i) => {
				const { color, animation, timing } = lookup[String(type)];

				return (
					<FlashMessage
						key={uuid}
						backgroundColor={color}
						animation={animation}
						delay={delay}
						fillMode={fillMode}
						timing={timing}
					>
						{message}
					</FlashMessage>
				);
			})}
		</>
	);
};
var FlashMessage = styled.div`
	position: absolute;
	z-index: 50;
	width: 100%;
	padding: 1em 0 1em 0;
	text-align: center;
	font-family: Montserrat;
	font-weight: 700;
	transition: transform 250ms ease-in-out, opacity 100ms ease-in-out,
		background-color 500ms ease-in-out;
	${({ backgroundColor, animation, timing, delay, fillMode }) => {
		console.log(delay);
		return css`
			background-color: ${backgroundColor};
			animation: ${animation} ${timing};
			animation-delay: ${delay}ms;
			animation-fill-mode: ${fillMode};
		`;
	}}
`;

FlashMessages.propTypes = {
	flashMessages: PropTypes.array,
	setFlashMessages: PropTypes.func,
};

export default FlashMessages;

/**
 * @typedef {{
 *		delay: Number | "infinite",
 *		message: String,
 *		type: 'Success' | 'Failure' | 'Warning',
 *    fillMode?: 'none' | 'forwards' | 'backwards' | 'both',
 *    uuid?: String,
 *	}} FlashMessage
 */
