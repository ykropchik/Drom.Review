import React, { useState } from 'react';
import { PageHeader, Layout, Steps, Collapse, Divider, Button, Empty } from 'antd';
import { useRouter } from 'next/router';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import {
	CheckCircleOutlined,
	CommentOutlined, FileDoneOutlined,
	FileTextOutlined, SyncOutlined,
} from '@ant-design/icons';
import styles from './UnfamiliarReview.module.scss';
import RespondentsList from '../RespondentsList/RespondentsList';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import OpinionsList from '../OpinionsList/OpinionsList';
import StatusesTimeline from '../StatusesTimeline/StatusesTimeline';
import { reviewStatusInfo } from '../../configs/reviewStatus';
import RespondentsForm from '../RespondentsForm/RespondentsForm';
import SelfReviewForm from '../SelfReviewForm/SelfReviewForm';

const { Content } = Layout;
const { Step } = Steps;
const { Panel } = Collapse;

export default function UnfamiliarReview({ review }) {
	const [selfReviewFormVisible, setSelfReviewFormVisible] = useState(false);
	const [respondentsFormVisible, setRespondentsFormVisible] = useState(false);
	const router = useRouter();

	return (
		<PageHeader title={review.subject.name}
		            avatar={{ style: { backgroundColor: '#DB011A'}, children: getAvatarPlaceholder(review.subject.name) }}
		            subTitle={`${review.specialization}: ${review.grade}`}
		            onBack={() => router.back()}>
			<Steps className={styles.steps} current={reviewStatusInfo[review.currentStatus.status].step} direction="horizontal">
				<Step title="Начало review" icon={<FileTextOutlined />} description="Сбор self-review и списка респондентов"/>
				<Step title="Проверка" icon={<FileDoneOutlined />} description="Проверка self-review и списка респондентов" />
				<Step title="Сбор 360 мнений" icon={<SyncOutlined />} description="Респонденты отказываются или пишут 360-мнение" />
				<Step title="Встреча" icon={<CommentOutlined />} description="Личная встреча техлида и объекта оценки"/>
				<Step title="Завершено" icon={<CheckCircleOutlined />}/>
			</Steps>
			<div>
				{
					reviewStatusInfo[review.currentStatus.status].step < 2 &&
					<>
						<Button type="primary" onClick={() => setSelfReviewFormVisible(true)}>{review.selfReview ? 'Добавить review' : 'Редактировать review'}</Button>
						<Divider type="vertical"/>
						<Button type="primary" onClick={() => setRespondentsFormVisible(true)}>{review.respondentsList ? 'Добавить респондентов' : 'Редактировать респондентов'}</Button>
					</>
				}
			</div>
			<Content>
				<Collapse ghost>
					<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>Self review</Divider>} key="selfReview">
						{
							review.selfReview ?
								<MarkdownRender mdText={review.selfReview}/>
								:
								<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
						}
					</Panel>
					<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>Список респондентов</Divider>}
					       key="respondentsList">
						<RespondentsList list={review.respondentsList}/>
					</Panel>
					<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>360 мнения</Divider>}
					       key="opinions">
						<OpinionsList list={review.opinionsList}/>
					</Panel>
					<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>История статусов и комментарии</Divider>}
					       key="history">
						<StatusesTimeline data={review.history}/>
					</Panel>
				</Collapse>
				<SelfReviewForm visible={selfReviewFormVisible}
				                onCancel={() => setSelfReviewFormVisible(false)}
				                title={review.respondentsList === null ? 'Создание self-review' : 'Редактирование self-review'}
				                initialData={{ review: review.selfReview || '' }}/>
				<RespondentsForm visible={respondentsFormVisible}
				                 onCancel={() => setRespondentsFormVisible(false)}
				                 title={review.respondentsList === null ? 'Создание списка респондентов' : 'Редактирование списка респондентов'}
				                 initialData={{ respondents: review.respondentsList }}/>
			</Content>
		</PageHeader>
	);
}