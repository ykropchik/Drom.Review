import React from 'react';
import ReviewStatus from '../ReviewStatus/ReviewStatus';

export default function StatusesTimeline({ data }) {
	return (
		<div>
			{
				data.map((item, i) => (
					<ReviewStatus key={i} step={item.status} author={item.user} comment={item.comment}/>
				))
			}
		</div>
	);
}