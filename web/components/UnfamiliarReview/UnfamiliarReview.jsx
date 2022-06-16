import React from 'react';
import { PageHeader, Layout, Steps, Collapse, Divider } from 'antd';
import { useRouter } from 'next/router';
import UserAvatar from '../UserAvatar/UserAvatar';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import { CommentOutlined, OrderedListOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import styles from './UnfamiliarReview.module.scss';
import RespondentsList from '../RespondentsList/RespondentsList';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import OpinionsList from '../OpinionsList/OpinionsList';

const { Content } = Layout;
const { Step } = Steps;
const { Panel } = Collapse;

export default function UnfamiliarReview({ review }) {
	const router = useRouter();

	return (
		<PageHeader title={`${review.specialization}: ${review.grade}`}
		            subTitle={<ReviewObject object={review.object}/>}
		            onBack={() => router.back()}>
			<Steps className={styles.steps} current={2}>
				<Step title="Self review" icon={<UserOutlined />}/>
				<Step title="Список респондентов" icon={<OrderedListOutlined />}/>
				<Step title="360 мнения" icon={<SyncOutlined />}/>
				<Step title="Встреча" icon={<CommentOutlined />}/>
			</Steps>
			<Content>
				<Collapse ghost>
					<Panel header={<Divider style={{ margin: 0 }} orientation="left">Self review</Divider>} key="selfReview">
						<MarkdownRender mdText={review.selfReview}/>
					</Panel>
					<Panel header={<Divider style={{ margin: 0 }} orientation="left">Список респондентов</Divider>}
					       key="respondentsList">
						<RespondentsList list={review.respondentsList}/>
					</Panel>
					<Panel header={<Divider style={{ margin: 0 }} orientation="left">360 мнения</Divider>}
					       key="opinions">
						<OpinionsList list={review.opinionsList}/>
					</Panel>
				</Collapse>
			</Content>
		</PageHeader>
	);
}

function ReviewObject({ object }) {
	return (
		<span className={styles.review_object}>
			<UserAvatar avatarPlaceholder={getAvatarPlaceholder(object.name)} size={32}/>
			{object.name}
		</span>
	);
}