import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { reviews } from '../../stubs/reviews';
import { Button, Card, Collapse, Divider, Dropdown, Empty, Layout, Menu, PageHeader, Steps } from 'antd';
import styles from '../../public/styles/pages/Review.module.scss';
import { reviewStatusStep } from '../../configs/reviewInfo';
import {
	CaretDownOutlined,
	CheckCircleOutlined,
	CommentOutlined, EditOutlined,
	FileDoneOutlined,
	FileTextOutlined, ForwardOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import MarkdownRender from '../../components/MarkdownRender/MarkdownRender';
import RespondentsList from '../../components/RespondentsList/RespondentsList';
import OpinionsList from '../../components/OpinionsList/OpinionsList';
import StatusesTimeline from '../../components/StatusesTimeline/StatusesTimeline';
import SelfReviewForm from '../../components/SelfReviewForm/SelfReviewForm';
import RespondentsForm from '../../components/RespondentsForm/RespondentsForm';
import { UserRoleContext } from '../_app';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import MarkdownEditor from '../../components/MarkdownEditor/MarkdownEditor';

const { Content } = Layout;
const { Step } = Steps;
const { Panel } = Collapse;

export default function ReviewPage() {
	const router = useRouter();
	const { id } = router.query;
	const [review, setReview] = useState(reviews[id]);
	const [selfReviewFormVisible, setSelfReviewFormVisible] = useState(false);
	const [respondentsFormVisible, setRespondentsFormVisible] = useState(false);
	const userRole = useContext(UserRoleContext);
	const [pageHeaderProps, setPageHeaderProps] = useState({});
	const [comment, setComment] = useState('');

	useEffect(() => {
		setPageHeaderProps(getPageHeaderProps(userRole));
	}, [userRole]);

	useEffect(() => {
		setReview(reviews[id]);
	}, []);

	const getPageHeaderProps = (role) => {
		if (role === 'default') {
			return {
				title: `${review?.specialization}: ${review?.grade}`
			};
		}

		return {
			title: review?.subject.name,
			avatar: { style: { backgroundColor: '#DB011A'}, children: getAvatarPlaceholder(review?.subject.name) },
			subTitle: `${review?.specialization}: ${review?.grade}`
		};
	};

	if (!id) {
		return null;
	}

	const onSelfReviewEditClickHandler = (e) => {
		e.stopPropagation();
		setSelfReviewFormVisible(true);
	};

	const onRespondentsListEditClickHandler = (e) => {
		e.stopPropagation();
		setRespondentsFormVisible(true);
	};

	const onCommentChangeHandler = (value) => {
		setComment(value.trim());
	};

	const onLeaderButtonsClickHandler = (data) => {
		console.log(data);
	};

	const onCommentClickHandler = () => {

	};

	return (
		<PageHeader {...pageHeaderProps} onBack={() => router.back()}>
			<Card>
				<Steps className={styles.steps} current={reviewStatusStep[review.currentStatus]} direction="horizontal">
					<Step title="Начало review" icon={<FileTextOutlined />} description="Сбор self-review и списка респондентов"/>
					<Step title="Проверка" icon={<FileDoneOutlined />} description="Проверка self-review и списка респондентов" />
					<Step title="Сбор 360 мнений" icon={<SyncOutlined />} description="Респонденты отказываются или пишут 360-мнение" />
					<Step title="Встреча" icon={<CommentOutlined />} description="Личная встреча техлида и объекта оценки"/>
					<Step title="Завершено" icon={<CheckCircleOutlined />}/>
				</Steps>
				<Content>
					<Collapse ghost>
						<Panel header={
							<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>
								Self review
								{reviewStatusStep[review.currentStatus] < 2 && userRole === 'default' &&
									<span className={styles.edit_button}
									      onClick={onSelfReviewEditClickHandler}><EditOutlined/></span>
								}
							</Divider>} key="selfReview">
							{
								review.selfReview ?
									<MarkdownRender mdText={review.selfReview}/>
									:
									<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
							}
						</Panel>
						<Panel header={
							<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>
								Список респондентов
								{reviewStatusStep[review.currentStatus] < 2 && userRole === 'default' &&
									<span className={styles.edit_button}
									      onClick={onRespondentsListEditClickHandler}><EditOutlined/></span>
								}
							</Divider>}
						       key="respondentsList">
							<RespondentsList list={review.respondentsList}/>
						</Panel>
						{
							userRole !== 'default' &&
							<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>360 мнения</Divider>}
							       key="opinions">
								<OpinionsList list={review.opinionsList}/>
							</Panel>
						}
						{/*<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>История статусов и комментарии</Divider>}*/}
						{/*       key="history">*/}
						{/*	<StatusesTimeline data={review.history}/>*/}
						{/*</Panel>*/}
					</Collapse>
				</Content>
			</Card>
			<h2 className={styles.history_title}>История изменений:</h2>
			<StatusesTimeline data={review.history}/>
			{
				review.currentStatus !== 'completed' &&
				<>
					<Divider/>
					<div>
						<MarkdownEditor value={comment} onChange={onCommentChangeHandler}/>
						<div className={styles.new_comment_buttons}>
							{
								userRole !== 'default' &&
								<>
									<LeaderButtons reviewStatus={review.currentStatus} onClick={onLeaderButtonsClickHandler} withComment={comment}/>
									<Divider type="vertical"/>
								</>
							}
							<Button type="primary" onClick={onCommentClickHandler} disabled={!comment}>Комментарий</Button>
						</div>
					</div>
				</>
			}
			<SelfReviewForm visible={selfReviewFormVisible}
			                onCancel={() => setSelfReviewFormVisible(false)}
			                title={review.respondentsList === null ? 'Создание self-review' : 'Редактирование self-review'}
			                initialData={{ review: review.selfReview || '' }}/>
			<RespondentsForm visible={respondentsFormVisible}
			                 onCancel={() => setRespondentsFormVisible(false)}
			                 title={review.respondentsList === null ? 'Создание списка респондентов' : 'Редактирование списка респондентов'}
			                 initialData={{ respondents: review.respondentsList || [] }}/>
		</PageHeader>
	);
}

function LeaderButtons({ reviewStatus, withComment }) {
	const [buttonIcon, setButtonIcon] = useState(<ForwardOutlined />);
	const [buttonText, setButtonText] = useState('Изменить статус');
	const [changeStatusType, setChangeStatusType] = useState('next');

	const overlayItems = [
		{
			label: 'Вернуть на редактирование',
			key: 'edit',
			icon: <EditOutlined/>,
		},
		{
			label: 'Следующий этап',
			key: 'next',
			icon: <ForwardOutlined/>,
		}
	];

	const onButtonMenuClickHandler = (e) => {
		setChangeStatusType(e.key);
	};

	const overlay = <Menu selectedKeys={[changeStatusType]} onClick={onButtonMenuClickHandler} items={overlayItems}/>;


	useEffect(() => {
		withComment ? setButtonText('Изменить статус с комментарием') : setButtonText('Изменить статус');
	}, [withComment]);

	useEffect(() => {
		setButtonIcon(changeStatusType === 'next' ? <ForwardOutlined /> : <EditOutlined />);
	}, [changeStatusType]);

	switch (reviewStatus) {
		case 'review':
			return <Dropdown.Button icon={<CaretDownOutlined />} overlay={overlay} trigger={['click']}>{buttonIcon}{buttonText}</Dropdown.Button>;
		default:
			return <Button>{buttonIcon}{buttonText}</Button>;
	}
}
