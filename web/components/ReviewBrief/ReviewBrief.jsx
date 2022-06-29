import React from 'react';
import { Card, Divider, Steps } from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import { CheckOutlined, ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { reviewStatusStep } from '../../configs/reviewInfo';
import styles from './ReviewBrief.module.scss';

const { Step } = Steps;

export default function ReviewBrief({ review, selfBrief }) {
	const router = useRouter();

	const onClickHandler = () => {
		router.push(`/review/${review.id}`);
	};

	return (
		<Card className={styles.content}
		      onClick={onClickHandler}
		      hoverable>
			{selfBrief ? <OwnBriefHeader review={review}/> : <UnfamiliarBriefHeader review={review}/>}
			<Divider/>
			<Steps direction="vertical"
			       size="small"
			       current={reviewStatusStep[review.currentStatus]}
			       progressDot={(iconDot, { status }) => {
				       switch (status) {
					       case 'finish': return <CheckOutlined className={styles.finish}/>;
					       case 'process': return <ClockCircleOutlined className={styles.process}/>;
					       case 'wait': return <CloseOutlined className={styles.wait}/>;
				       }
			       }}>
				<Step title="Начало review"/>
				<Step title="Проверка"/>
				<Step title="Сбор 360 мнений"/>
				<Step title="Встреча"/>
			</Steps>
		</Card>
	);
}

function OwnBriefHeader({ review }) {
	return <span className={styles.own_header}>{`${review.specialization}: ${review.grade}`}</span>;
}

function UnfamiliarBriefHeader({ review }) {
	return (
		<Card.Meta avatar={<UserAvatar avatarUrl={review.subject.avatarUrl} userName={review.subject.name} size={32}/>}
		           title={review.subject.name}
		           description={`${review.specialization}: ${review.grade}`}>
		</Card.Meta>
	);
}