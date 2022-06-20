import React from 'react';
import styles from './RatingScale.module.scss';
import { DeleteOutlined } from '@ant-design/icons';

export default function RatingScale({ title, rating, vertical = false, onRemove }) {

	const getColor = (num) => {
		return RatingColorScale[Math.round(num/(rating.length - 1) * (RatingColorScale.length - 1))];
	};

	return (
		<div className={styles.content} style={{ flexDirection: vertical ? 'column' : 'row' }}>
			{
				title &&
				<div className={styles.title}>{title}</div>
			}
			{
				rating?.map((item, i) =>
					<div className={styles.rating_item} key={i} style={{ color: getColor(i) }}>
						{item}
						{onRemove && <DeleteOutlined className={styles.remove_button} onClick={() => onRemove(item, i)}/>}
					</div>
				)
			}
		</div>
	);
}

const RatingColorScale = [
	'#E64A19',
	'#F57C00',
	'#FFA000',
	'#FBC02D',
	'#AFB42B',
	'#689F38',
	'#388E3C',
];
