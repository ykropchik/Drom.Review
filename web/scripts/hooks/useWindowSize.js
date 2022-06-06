import { useEffect, useState } from 'react';

function getWindowSize() {
	const { innerWidth: width, innerHeight: height } = window;

	return { width, height };
}
export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		setWindowSize(getWindowSize());

		function handleResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
}