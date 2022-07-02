import React from 'react';
import HistoryItem from '../HistoryItem/HistoryItem';

export default function HistoryTimeline({ data }) {
	return (
		<div>
			{
				data?.map((item, i) => (
					<HistoryItem key={i} action={item.action} author={item.user} comment={item.comment}/>
				))
			}
		</div>
	);
}