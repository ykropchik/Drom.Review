import React from 'react';
import { useRouter } from 'next/router';
import UnfamiliarReview from '../../components/UnfamiliarReview/UnfamiliarReview';
import { reviews } from '../../stubs/reviews';

export default function Review() {
	const router = useRouter();
	const { id } = router.query;

	if (!id) {
		return null;
	}

	return (
		<UnfamiliarReview review={reviews[id]}/>
	);
}