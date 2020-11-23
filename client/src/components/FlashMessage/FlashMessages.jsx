/* eslint-disable indent */
import React, { useRef } from 'react';
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

const slideAnim = keyframes`
  from, 0%, to {
  }
  100% {
		transform: translateY(-100%)
  }
`;

/** @type {Object.<string, LookupElement>} */
const lookup = {
	Success: {
		color: 'cornflowerblue',
		animation: slideAnim,
		timing: '1s ease 1',
	},
	Warning: { color: 'chocolate', livAnim: bounceAnim, timing: '1s ease infinite' },
	Failure: { color: 'crimson', livAnim: bounceAnim, timing: '1s ease infinite' },
};

/**
 * @param {{flashMessages: FlashMessage[]}} param0
 */
const FlashMessages = ({ flashMessages, setFlashMessages }) => {
	/** @type {RegisteredAnimations} */
	const regAnims = useRef({});

	if (flashMessages.length === 0) return null;
	// TODO: Add max & min duration for the animations

	console.log(flashMessages);
	return (
		<FlashMsgWrap>
			{flashMessages.map(
				({
					delay = 0,
					uuid,
					message,
					type,
					fillMode = 'none',
					index = 0,
					minDur = 500,
					maxDur = 'infinite',
				}) => {
					const { color, livAnim: _livAnim, timing } = lookup[String(type)];
					const livAnim = typeof _livAnim === 'function' ? _livAnim(index) : _livAnim;

					// If there was an animation registered, clear the timeout
					if (regAnims.current[String(uuid)]) {
						clearTimeout(regAnims.current[String(uuid)].exitId);
						regAnims.current[String(uuid)].startTime = Date.now();
					}

					// Register deletion callback && into the regAnims holder
					if (maxDur !== 'infinite') {
						// Delete the animated object from the pool
						const exitId = setTimeout(() => {
							setFlashMessages(cur => {
								const index = cur.findIndex(({ uuid: flashUUID }) => uuid === flashUUID);
								if (index === -1) return cur;

								// Object found, deleting

								// TODO, add exit animations
								delete regAnims.current[String(uuid)];
								cur.splice(index, 1);
								return [...cur];
							});
						}, Math.max(maxDur, minDur));

						// Add the animation to the pool of animated objects
						regAnims.current[String(uuid)] = { exitId, startTime: Date.now() };
					}

					return (
						<FlashMessage
							key={uuid}
							backgroundColor={color}
							animation={livAnim}
							delay={delay}
							fillMode={fillMode}
							timing={timing}
						>
							{message}
						</FlashMessage>
					);
				}
			)}
		</FlashMsgWrap>
	);
};

var FlashMsgWrap = styled.div`
	position: fixed;
	z-index: 50;
	width: 100%;
`;

var FlashMessage = styled.div`
	padding: 1em 0 1em 0;
	text-align: center;
	font-family: Montserrat;
	font-weight: 700;
	transition: transform 250ms ease-in-out, opacity 100ms ease-in-out,
		background-color 500ms ease-in-out;
	${({ backgroundColor, animation, timing, delay, fillMode }) => {
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
 *		delay: Number,
 *		message: String,
 *		type: 'Success' | 'Failure' | 'Warning',
 *    fillMode?: 'none' | 'forwards' | 'backwards' | 'both',
 *    uuid?: String,
 * 		index?: Number,
 * 		maxDur?: Number | "infinite",
 * 		minDur?: Number,
 *	}} FlashMessage
 */

/**
 * @typedef {{current: Object.<string, {
 * 	exitId : Number,
 * 	startTime: Number,
 * }>}} RegisteredAnimations
 */

/**
 * @typedef LookupElement
 * @prop {String} color - The color of the notification
 * @prop {String} timing - The timing function ex. "1s ease infinite"
 * @prop {import("@emotion/serialize").Keyframes | (index: number)=> import("@emotion/serialize").Keyframes} [livAnim] - What should play while the banner is alive. (what @emotion/core keyframes`...` returns)
 * @prop {import("@emotion/serialize").Keyframes | (index: number)=> import("@emotion/serialize").Keyframes} [exitAnim] - What should play before the banner is removed. (what @emotion/core keyframes`...` returns)
 */
