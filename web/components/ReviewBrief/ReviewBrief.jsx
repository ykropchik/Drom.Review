import React from 'react';
import { Card, Timeline } from 'antd';
import styles from './ReviewBrief.module.scss';
import UserAvatar from '../UserAvatar/UserAvatar';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

export default function ReviewBrief({ review, selfBrief }) {
	return selfBrief ? <SelfBrief review={review}/> : <UnfamiliarBrief review={review}/>;
}

function SelfBrief({ review }) {
	const router = useRouter();

	const onClickHandler = () => {
		router.push(`/reviews/${review.id}`);
	};

	return (
		<Card className={styles.content}
		      title={`${review.specialization}: ${review.grade}`}
		      onClick={onClickHandler}
		      hoverable>
			<Timeline>
				<Timeline.Item dot={<Granted/>}>Self review</Timeline.Item>
				<Timeline.Item dot={<Missing/>}>Список респондентов</Timeline.Item>
				<Timeline.Item dot={<Missing/>}>360 мнения</Timeline.Item>
				<Timeline.Item dot={<Missing/>}>Встреча</Timeline.Item>
			</Timeline>
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