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
	UserSwitchOutlined,
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
import StatisticModal from '../../components/StatisticModal/StatisticModal';

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
	const [statisticModalVisible, setStatisticModalVisible] = useState(false);

	useEffect(() => {
		setPageHeaderProps(getPageHeaderProps(role));
	}, [role, review.data]);

	const getPageHeaderProps = (role) => {
		if (role === 'ROLE_LEADER') {
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

	const onCommentClickHandler = () => {
		setCommentSending(true);
		request(EndPoints.REVIEW + `/${id}/comment`, 'PUT', { comment: comment })
			.finally(() => {
				setCommentSending(false);
				review.update();
			})
			.then(() => {
				setComment('');
				message.success('?????????????????????? ??????????????????');
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
			.then(() => message.success('???????????? ??????????????'))
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
				message.success('?????????????????? ??????????????????');
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
				message.success('?????????????????? ??????????????????');
				setRespondentsFormVisible(false);
			})
			.catch((err) => message.error(err.message));
	};

	return (
		<PageHeader {...pageHeaderProps} onBack={() => router.back()}>
			<Card>
				<Steps className={styles.steps} current={reviewStatusInfo[review.data?.status]?.step} direction="horizontal">
					<Step title="???????????? review" icon={<FileTextOutlined />} description="???????? self-review ?? ???????????? ????????????????????????"/>
					<Step title="????????????????" icon={<FileDoneOutlined />} description="???????????????? self-review ?? ???????????? ????????????????????????" />
					<Step title="???????? 360 ????????????" icon={<UserSwitchOutlined />} description="?????????????????????? ???????????????????????? ?????? ?????????? 360-????????????" />
					<Step title="??????????????" icon={<CommentOutlined />} description="???????????? ?????????????? ?????????????? ?? ?????????????? ????????????"/>
					<Step title="??????????????????" icon={<CheckCircleOutlined />}/>
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
								???????????? ????????????????????????
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
							<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>360 ????????????</Divider>}
							       key="opinions">
								{ review.data?.opinions.length !== 0 && <Button type="link" onClick={() => setStatisticModalVisible(true)}>????????????????????</Button> }
								<OpinionsList list={review.data?.opinions}/>
							</Panel>
						}
						{/*<Panel header={<Divider style={{ margin: 0 }} orientation="left" orientationMargin={12}>?????????????? ???????????????? ?? ??????????????????????</Divider>}*/}
						{/*       key="history">*/}
						{/*	<HistoryTimeline data={review.history}/>*/}
						{/*</Panel>*/}
					</Collapse>
				</Content>
			</Card>
			<h2 className={styles.history_title}>?????????????? ??????????????????:</h2>
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
										<LeaderButtons currentStatus={review.data?.status} onClick={setNewStatus} withComment={comment}/>
										<Divider type="vertical"/>
									</>
								}
								{
									role === 'ROLE_USER' && reviewStatusInfo[review.data?.status]?.step === 0 &&
									<>
										<Button onClick={() => setNewStatus('review')}>{comment ? '?????????????????? ???? ???????????????? ?? ????????????????????????' : '?????????????????? ???? ????????????????'}</Button>
										<Divider type="vertical"/>
									</>
								}
								<Button type="primary" onClick={onCommentClickHandler} disabled={!comment}>??????????????????????</Button>
							</div>
						</div>
					</>
				}
			</Spin>
			<StatisticModal visible={statisticModalVisible}
			                onClose={() => setStatisticModalVisible(false)} 
			                reviewId={review.data?.id}/>
			<SelfReviewForm visible={selfReviewFormVisible}
			                isLoading={saving}
			                onCancel={() => setSelfReviewFormVisible(false)}
			                title={review.data?.selfReview === null ? '???????????????? self-review' : '???????????????????????????? self-review'}
			                onSave={onSaveSelfReviewHandler}
			                initialData={{ selfReview: review.data?.selfReview || '' }}/>
			<RespondentsForm visible={respondentsFormVisible}
			                 isLoading={saving}
			                 onCancel={() => setRespondentsFormVisible(false)}
			                 title={review.data?.respondentsList === null ? '???????????????? ???????????? ????????????????????????' : '???????????????????????????? ???????????? ????????????????????????'}
			                 onSave={onSaveRespondentsHandler}
			                 initialData={{ respondents: review.data?.respondents.map((item) => item.id) || [] }}/>
		</PageHeader>
	);
}

function LeaderButtons({ currentStatus, withComment, onClick }) {
	const [buttonIcon, setButtonIcon] = useState(<ForwardOutlined />);
	const [buttonText, setButtonText] = useState('???????????????? ????????????');
	const [changeStatusType, setChangeStatusType] = useState('next');

	const overlayItems = [
		{
			label: '?????????????? ???? ????????????????????????????',
			key: 'edit',
			icon: <EditOutlined/>,
		},
		{
			label: '?????????????????? ????????',
			key: 'next',
			icon: <ForwardOutlined/>,
		}
	];

	const onButtonMenuClickHandler = (e) => {
		setChangeStatusType(e.key);
	};

	const onClickHandler = () => {
		if (changeStatusType === 'edit') {
			onClick('correction');
		} else {
			const statuses = Object.keys(reviewStatusInfo);
			const nextStatusIndex = statuses.indexOf(currentStatus) + 1;
			onClick(statuses[nextStatusIndex]);
		}
	};

	const overlay = <Menu selectedKeys={[changeStatusType]} onClick={onButtonMenuClickHandler} items={overlayItems}/>;


	useEffect(() => {
		withComment ? setButtonText('???????????????? ???????????? ?? ????????????????????????') : setButtonText('???????????????? ????????????');
	}, [withComment]);

	useEffect(() => {
		setButtonIcon(changeStatusType === 'next' ? <ForwardOutlined /> : <EditOutlined />);
	}, [changeStatusType]);

	switch (currentStatus) {
		case 'review':
			return <Dropdown.Button icon={<CaretDownOutlined />} overlay={overlay} trigger={['click']} onClick={onClickHandler}>{buttonIcon}{buttonText}</Dropdown.Button>;
		default:
			return <Button onClick={onClickHandler}>{buttonIcon}{buttonText}</Button>;
	}
}
