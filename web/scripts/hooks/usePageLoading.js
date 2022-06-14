import { useState } from 'react';
import { useRouter } from 'next/router';

export default function usePageLoading() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleStart = (url) => (url !== router.asPath) && setLoading(true);
	const handleComplete = (url) => (url === router.asPath) && setLoading(false);

	router.events.on('routeChangeStart', handleStart);
	router.events.on('routeChangeComplete', handleComplete);
	router.events.on('routeChangeError', handleComplete);

	return loading;
}