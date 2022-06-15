import React from 'react';
import { useRouter } from 'next/router';

export default function Review() {
	const router = useRouter();
	const { id } = router.query;

	return (
		<span>Review: {id}</span>
	);
}