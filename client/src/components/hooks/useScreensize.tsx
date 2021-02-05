const useScreenSize = () => {
	const [windowSize, setWindowSize] = useState([
		window.innerWidth,
		window.innerHeight,
	] as const);

	useLayoutEffect(() => {
		const listener = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};
		window.addEventListener('resize', listener);

		return () => {
			window.removeEventListener('resize', listener);
		};
	}, []);
	return windowSize;
};

export default useScreenSize;

import { useLayoutEffect, useState } from 'react';
