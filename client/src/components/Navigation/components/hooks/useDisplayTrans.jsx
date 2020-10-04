/**
 * 
 * @param {{animTime?: Number,
  condition: Boolean,
  initDisplay:    "flex" | "block" | "none" | String , 
  toggledDisplay: "flex" | "block" | "none" | String , 
  cssOnReInt: import('@emotion/core').Interpolation 
}} param0 - AnimTime is the time it will take to invoke the display transition 
          - initDisplay is the initial state of the display property
          - toggledDisplay is the state of the display property after it has been toggled
          - cssOnReInt is the css of the Element that should be present when it reenters the browsers' flow
*/
const useDisplayTrans = ({
	animTime = 300,
	initDisplay = 'flex',
	toggledDisplay = 'none',
	condition,
	cssOnReInit,
}) => {
	const [display, setDisplay] = useState('flex');
	const [queue, setQueue] = useState([]);
	useLayoutEffect(() => {
		if (!condition && display === initDisplay) {
			return setQueue(queue => {
				if (queue.length === 2) {
					clearTimeout(queue[1]);
					delete queue[1];
				}
				return [
					...queue,
					setTimeout(() => {
						setDisplay(toggledDisplay);
						setQueue(queue => {
							queue.splice(queue.length, 1);
							return queue;
						});
					}, animTime),
				];
			});
		}
		if (condition && display === 'none') {
			setDisplay('flex');
		}
	}, [animTime, condition, initDisplay, toggledDisplay]);
	return [];
};

export default useDisplayTrans;
import { useLayoutEffect, useState } from 'react';
