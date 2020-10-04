/** @returns {[number, number]} */
const useScreenSize = () => {
	const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
	useLayoutEffect(() => {
		window.addEventListener('resize', () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		});
		return () => {
			window.removeEventListener(
				'resize',
				setWindowSize([window.innerWidth, window.innerHeight])
			);
		};
	}, []);
	return windowSize;
};

export default useScreenSize;

import { useLayoutEffect, useState } from 'react';
