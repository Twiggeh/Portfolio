/* eslint-disable indent */
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

// how many milliseconds leeway to allow updating the current animation even if the minimum time has not yet passed. Removes "unnecessary" setTimeouts
const animationSwitchThreshold = 50;

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

const lookup: Record<'Success' | 'Warning' | 'Failure', LookupElement> = {
	Success: {
		color: 'cornflowerblue',
		livAnim: slideAnim,
		timing: '1s ease 1',
		delay: 2700,
		fillMode: 'both',
		maxDur: 3700,
		minDur: 1000,
		exitAnim: slideAnim,
	},
	Warning: {
		color: 'chocolate',
		livAnim: bounceAnim,
		timing: '1s ease infinite',
		minDur: 1000,
		maxDur: 3700,
		fillMode: 'both',
		exitAnim: slideAnim,
		delay: 0,
	},
	Failure: {
		color: 'crimson',
		livAnim: bounceAnim,
		timing: '1s ease infinite',
		maxDur: 3700,
		fillMode: 'both',
		exitAnim: slideAnim,
		delay: 0,
		minDur: 1000,
	},
};

const getLookup = (type: keyof typeof lookup, index: number): LookupElement => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const data = lookup[String(type)];
	const livAnim = typeof data.livAnim === 'function' ? data.livAnim(index) : data.livAnim;
	return { ...data, livAnim };
};

const FlashMessages: React.FC<IFlashMessages> = ({ flashMessages, setFlashMessages }) => {
	const regAnims: RegisteredAnimations = useRef({});
	const refresh = useState(false)[1];
	const update = () => refresh(c => !c);

	if (flashMessages.length === 0) return null;
	// TODO: Add max & min duration for the animations

	console.log(flashMessages);
	return (
		<FlashMsgWrap>
			{flashMessages.map(({ uuid, message, type, index = 0 }) => {
				let { color, timing, livAnim, delay, fillMode } = getLookup(type, index);
				const { minDur = 1000, maxDur = 'infinite' } = getLookup(type, index);

				const animRegistrar = regAnims.current[String(uuid)];

				if (animRegistrar) {
					const isNewAnim = animRegistrar.curAnim !== type;
					const timePassed = Date.now() - animRegistrar.startTime;
					const minTimePassed = timePassed > minDur - animationSwitchThreshold;

					if (isNewAnim) {
						// New Animation has been detected, remove the un-mount of the element
						clearTimeout(animRegistrar.exitId);
					}

					// Play the next animation that is in the queue
					if (animRegistrar.nextAnims.length && minTimePassed) {
						// Stack animations that are the same type TODO: needs to be moved
						//if (animRegistrar.nextAnims[animRegistrar.nextAnims.length - 1] !== type) {
						//	console.log('Todo');
						//}

						// remove the next animation, need to remove next data as well
						const queuedType = animRegistrar.nextAnims.shift();
						if (queuedType) {
							const data = getLookup(queuedType, index);

							color = data.color;
							timing = data.timing;
							livAnim = data.livAnim;
							delay = data.delay;
							fillMode = data.fillMode;
						}
					}

					// animation needs to change and has not yet played the minimum required time to play
					if (isNewAnim && !minTimePassed) {
						animRegistrar.nextAnims = [type, ...animRegistrar.nextAnims];

						// register next Data as well

						// set a timeout that will refresh this element as soon as the minimum time runs out.
						setTimeout(update, minDur - timePassed);

						// dont update the component, return early
						const { color, timing, livAnim, delay, fillMode } = getLookup(
							animRegistrar.curAnim,
							index
						);

						return (
							<FlashMessage
								key={uuid}
								color={color}
								livAnim={livAnim}
								delay={delay}
								fillMode={fillMode}
								timing={timing}>
								{animRegistrar.curData}
							</FlashMessage>
						);
					}

					// New Animation could be played immediately
					// animRegistrar.startTime = Date.now();
				}

				let exitId;
				// Register deletion callback && into the regAnims holder
				if (maxDur !== 'infinite') {
					// Delete the animated object from the pool
					exitId = setTimeout(() => {
						setFlashMessages(cur => {
							const index = cur.findIndex(({ uuid: flashUUID }) => uuid === flashUUID);
							if (index === -1) return cur;

							// TODO, add exit and enter animations

							// Object found, deleting current AnimRegistrar
							delete regAnims.current[String(uuid)];
							cur.splice(index, 1);
							return [...cur];
						});
					}, Math.max(maxDur, minDur));
				}

				// Add the animation to the pool of animated objects
				regAnims.current[String(uuid)] = {
					exitId,
					startTime: Date.now(),
					curAnim: type,
					nextAnims: [],
					curData: message,
				};

				return (
					<FlashMessage
						key={uuid}
						color={color}
						livAnim={livAnim}
						delay={delay}
						fillMode={fillMode}
						timing={timing}>
						{message}
					</FlashMessage>
				);
			})}
		</FlashMsgWrap>
	);
};

var FlashMsgWrap = styled.div`
	position: fixed;
	z-index: 50;
	width: 100%;
`;

var FlashMessage = styled.div<
	Pick<LookupElement, 'color' | 'livAnim' | 'timing' | 'delay' | 'fillMode' | 'color'>
>`
	padding: 1em 0 1em 0;
	color: white;
	text-align: center;
	font-family: Montserrat;
	font-weight: 700;
	transition: transform 250ms ease-in-out, opacity 100ms ease-in-out,
		background-color 500ms ease-in-out;
	${({ color, livAnim, timing, delay, fillMode }) => {
		return css`
			background-color: ${color};
			animation: ${livAnim as string} ${timing};
			animation-delay: ${delay}ms;
			animation-fill-mode: ${fillMode};
		`;
	}}
`;

export default FlashMessages;

export type FlashMessage = {
	delay?: number;
	message: string;
	type: 'Success' | 'Failure' | 'Warning';
	fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
	uuid?: string;
	index?: number;
	maxDur?: number | 'infinite';
	minDur?: number;
};

export type RegisteredAnimations = {
	current: Record<
		string,
		{
			exitId?: number;
			startTime: number;
			curAnim: FlashMessage['type'];
			curData: string;
			nextAnims: Array<FlashMessage['type']>;
		}
	>;
};

export type LookupElement = {
	color: string;
	timing: string;
	delay: number;
	minDur: number;
	maxDur: number | 'infinite';
	fillMode: 'both' | 'none' | 'forwards' | 'backwards' | 'initial' | 'inherit';
	livAnim:
		| import('@emotion/serialize').Keyframes
		| ((index: number) => import('@emotion/serialize').Keyframes);
	exitAnim:
		| import('@emotion/serialize').Keyframes
		| ((index: number) => import('@emotion/serialize').Keyframes);
};

interface IFlashMessages {
	flashMessages: FlashMessage[];
	setFlashMessages: React.Dispatch<React.SetStateAction<FlashMessage[]>>;
}

/**
  @typedef LookupElement
  @prop {String} color - The color of the notification
  @prop {String} timing - The timing function ex. "1s ease infinite"
  @prop {Number} [delay] - The delay before the animation will play [ms]
  @prop {Number} [minDur] - The minimum amount of time that an animation should play [ms]
  @prop {Number | "infinite"} [maxDur="infinte"] - The maximum amount of time that an animation should play [ms]
  																								- Make sure that it is as long or longer than delay & the duration in timing
  @prop {"both" | "none" | "forwards" | "backwards" | "initial" | "inherit"} [fillMode="none"] - The Animation fill Mode
  @prop {import("@emotion/serialize").Keyframes | (index: number)=> import("@emotion/serialize").Keyframes} [livAnim] - What should play while the banner is alive. (what @emotion/core keyframes`...` returns)
  @prop {import("@emotion/serialize").Keyframes | (index: number)=> import("@emotion/serialize").Keyframes} [exitAnim] - What should play before the banner is removed. (what @emotion/core keyframes`...` returns)
 */
