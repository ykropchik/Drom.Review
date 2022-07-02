import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Collapse, Divider, Dropdown, Empty, Layout, Menu, message, PageHeader, Spin, Steps } from 'antd';
import styles from '../../public/styles/pages/Review.module.scss';
import { reviewStatusInfo } from '../../configs/reviewInfo';
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
import HistoryTimeline from '../../components/HistoryTimeline/HistoryTimeline';
import SelfReviewForm from '../../components/SelfReviewForm/SelfReviewForm';
import RespondentsForm from '../../components/RespondentsForm/RespondentsForm';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import MarkdownEditor from '../../components/MarkdownEditor/MarkdownEditor';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import request from '../../scripts/api/request';
import { useSession } from '../../scripts/SessionProvider';

const { Content } = Layout;
const { Step } = Steps;
const { Panel } = Collapse;

export default function ReviewPage() {
	const router = useRouter();
	const { id } = router.query;
	const review = useData(EndPoints.REVIEW + '/' + id ?? 0);
	const [selfReviewFormVisible, setSelfReviewFormVisible] = useState(false);
	const [respondentsFormVisible, setRespondentsFormVisible] = useState(false);
	const { role } = useSession();
	const [pageHeaderProps, setPageHeaderProps] = useState({});
	const [comment, setComment] = useState('');
	const [saving, setSaving] = useState(false);
	const [statusChanging, setStatusChanging] = useState(false);
	const [commentSending, setCommentSending] = useState(false);

	useEffect(() => {
		setPageHeaderProps(getPageHeaderProps(role));
	}, [role, review.data]);

	const getPageHeaderProps = (role) => {
		if (role === 'ROLE_LEAD') {
			return {
				title: review.data?.subject.fullName,
				avatar: { style: { backgroundColor: '#DB011A'}, children: getAvatarPlaceholder(review.data?.subject.fullName) },
				subTitle: `${review.data?.specialization.name}: ${review.data?.grade.name}`
			};
		}

		return {
			title: `${review.data?.specialization.name}: ${review.data?.grade.name}`
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
		setCommentSending(true);
		request(EndPoints.REVIEW + `/${id}/comment`, 'PUT', { comment: comment })
			.finally(() => {
				setCommentSending(false);
				review.update();
			})
			.then(() => {
				setComment('');
				message.success('Комментарий отправлен');
			})
			.catch((err) => message.error(err.message));
	};

	const setNewStatus = (newStatus) => {
		setStatusChanging(true);
		request(EndPoints.REVIEW + `/${id}/status`, 'PUT', { status: newStatus, comment: comment !== '' ? comment : null })
			.finally(() => {
				setStatusChanging(false);
				review.update();
			})
			.then(() => message.success('Статус изменен'))
			.catch((err) => message.error(err.message));
	};

	const onSaveSelfReviewHandler = (data) => {
		setSaving(true);
		request(EndPoints.REVIEW + `/${id}/self-review`, 'PUT', data)
			.finally(() => {
				setSaving(false);
				review.update();
			})
			.then(() => {
				message.success('Изменения сохранены');
				setSelfReviewFormVisible(false);
			})
			.catch((err) => message.error(err.message));
	};

	const onSaveRespondentsHandler = (data) => {
		setSaving(true);
		request(EndPoints.REVIEW + `/${id}/respondents`, 'PUT', data)
			.finally(() => {
				setSaving(false);
				review.update();
			})
			.then(() => {
				message.success('Изменения сохранены');
				setRespondentsFormVisible(false);
			})
			.catch((err) => message.error(err.message));
	};

	return (
		<PageHeader {...pageHeaderProps} onBack={() => router.back()}>
			<Card>
				<Steps className={styles.steps} current={reviewStatusInfo[review.data?.status]?.step} direction="horizontal">
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
								{
									reviewStatusInfo[review.data?.status]?.step < 2 && role === 'ROLE_USER' &&
									<span className={styles.edit_button}
									      onClick={onSelfReviewEditClickHandler}><EditOutlined/></span>
								}
							</Divider>} key="selfReview">
							{
								review.data?.selfReview ?
									<MarkdownRender mdText={review.data?.selfReview}/>
									:
									<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
							}
						</Panel>
						<Panel header={
							<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>
								Список респондентов
								{
									reviewStatusInfo[review.data?.status]?.step < 2 && role === 'ROLE_USER' &&
									<span className={styles.edit_button}
									      onClick={onRespondentsListEditClickHandler}><EditOutlined/></span>
								}
							</Divider>}
						       key="respondentsList">
							<RespondentsList list={review.data?.respondents}/>
						</Panel>
						{
							role !== 'ROLE_USER' &&
							<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>360 мнения</Divider>}
							       key="opinions">
								<OpinionsList list={review.data?.opinionsList}/>
							</Panel>
						}
						{/*<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>История статусов и комментарии</Divider>}*/}
						{/*       key="history">*/}
						{/*	<HistoryTimeline data={review.history}/>*/}
						{/*</Panel>*/}
					</Collapse>
				</Content>
			</Card>
			<h2 className={styles.history_title}>История изменений:</h2>
			<HistoryTimeline data={review.data?.history}/>
			<Spin spinning={statusChanging || commentSending}>
				{
					review.data?.status !== 'completed' &&
					<>
						<Divider/>
						<div>
							<MarkdownEditor value={comment} onChange={onCommentChangeHandler}/>
							<div className={styles.new_comment_buttons}>
								{
									role !== 'ROLE_USER' &&
									<>
										<LeaderButtons reviewStatus={review.data?.status} onClick={onLeaderButtonsClickHandler} withComment={comment}/>
										<Divider type="vertical"/>
									</>
								}
								{
									role === 'ROLE_USER' && reviewStatusInfo[review.data?.status]?.step === 0 &&
									<>
										<Button onClick={() => setNewStatus('review')}>{comment ? 'Отправить на проверку с комментарием' : 'Отправить на проверку'}</Button>
										<Divider type="vertical"/>
									</>
								}
								<Button type="primary" onClick={onCommentClickHandler} disabled={!comment}>Комментарий</Button>
							</div>
						</div>
					</>
				}
			</Spin>
			<SelfReviewForm visible={selfReviewFormVisible}
			                isLoading={saving}
			                onCancel={() => setSelfReviewFormVisible(false)}
			                title={review.data?.selfReview === null ? 'Создание self-review' : 'Редактирование self-review'}
			                onSave={onSaveSelfReviewHandler}
			                initialData={{ selfReview: review.data?.selfReview || '' }}/>
			<RespondentsForm visible={respondentsFormVisible}
			                 isLoading={saving}
			                 onCancel={() => setRespondentsFormVisible(false)}
			                 title={review.data?.respondentsList === null ? 'Создание списка респондентов' : 'Редактирование списка респондентов'}
			                 onSave={onSaveRespondentsHandler}
			                 initialData={{ respondents: review.data?.respondents.map((item) => item.id) || [] }}/>
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
