import React from 'react';
import { Card, Steps, Timeline } from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import { CheckOutlined, ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { reviewStatusInfo } from '../../configs/reviewStatus';
import styles from './ReviewBrief.module.scss';

const { Step } = Steps;

export default function ReviewBrief({ review, selfBrief }) {
	return selfBrief ? <OwnBrief review={review}/> : <UnfamiliarBrief review={review}/>;
}

function OwnBrief({ review }) {
	const router = useRouter();

	const onClickHandler = () => {
		router.push(`/reviews/${review.id}`);
	};

	return (
		<Card className={styles.content}
		      title={`${review.specialization}: ${review.grade}`}
		      onClick={onClickHandler}
		      hoverable>
			<Steps direction="vertical"
			       current={reviewStatusInfo[review.currentStatus.status].step}
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

function UnfamiliarBrief({ review }) {
	const router = useRouter();

	const onClickHandler = () => {
		router.push(`/reviews/${review.id}`);
	};

	return (
		<Card className={styles.content}
		      title={<BriefHeader object={review.object} specialization={review.specialization} grade={review.grade} selfBrief={true}/>}
		      onClick={onClickHandler}
		      hoverable>
			<Timeline>
				<Timeline.Item dot={<Granted/>}>Self review</Timeline.Item>
				<Timeline.Item dot={<Missing/>}>Список респондентов</Timeline.Item>
				<Timeline.Item dot={<Missing/>}>360 мнения</Timeline.Item>
			</Timeline>
		</Card>
	);
}

function Granted() {
	return (
		<CheckOutlined className={styles.granted} />
	);
}

function Missing() {
	return (
		<CloseOutlined className={styles.missing} />
	);
}

function BriefHeader({ object, specialization, grade }) {
	return (
		<Card.Meta avatar={<UserAvatar avatarPlaceholder={getAvatarPlaceholder(object.name)} size={32}/>}
		           title={object.name}
		           description={`${specialization}: ${grade}`}>
		</Card.Meta>
	);
}