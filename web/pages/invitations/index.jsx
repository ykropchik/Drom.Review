import React, { useEffect, useState } from 'react';
import { Button, Collapse, Divider, List, message, Spin } from 'antd';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import Tag from '../../components/Tag/Tag';
import Link from 'next/link';
import styles from '../../public/styles/pages/Invitations.module.scss';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import request from '../../scripts/api/request';

export default function Invitations() {
	const { data: invitations, isLoading, update} = useData(EndPoints.RESPONDENTS);
	const [waitingDecision, setWaitingDecision] = useState([]);
	const [waitingOpinion, setWaitingOpinion] = useState([]);
	const [completed, setCompleted] = useState([]);

	useEffect(() => {
		if (invitations?.length > 0) {
			const waitingDecision = invitations.filter(item => item.status === 'waiting');
			const waitingOpinion = invitations.filter(item => item.status === 'accepted');
			const completed = invitations.filter(item => item.status === 'declined' || item.status === 'completed');
			setWaitingDecision(waitingDecision);
			setWaitingOpinion(waitingOpinion);
			setCompleted(completed);
		}
	}, [invitations]);

	const onStatusChangeHandler = (id, status, e) => {
		e.preventDefault();
		request(EndPoints.RESPONDENT_STATUS(id), 'POST', {status: status})
			.finally(() => update())
			.then(() => {
				if (status === 'accepted') {
					message.success('Приглашение принято');
				} else {
					message.success('Приглашение отклонено');
				}
			})
			.catch((err) => message.error(err.message));
	};

	return (
		<>
			{
				isLoading ?
					<Spin style={{ marginTop: '30%' }}/>
					:
					<Collapse defaultActiveKey="waiting_decision" ghost>
						<Collapse.Panel key="waiting_decision" header={<Divider style={{ margin: 0 }} orientation="left">Ожидают решения</Divider>}>
							<List dataSource={waitingDecision} renderItem={({id, user, review}) => (
								<Link href={`/invitations/${id}?preview`}>
									<List.Item className={styles.list_item}
									           actions={[
												   <Button key={'accept-btn'} onClick={(e) => onStatusChangeHandler(id, 'accepted', e)}>Принять</Button>,
										           <Button key={'decline-btn'} onClick={(e) => onStatusChangeHandler(id, 'declined', e)} type="primary">Отказаться</Button>
									           ]}>
										<List.Item.Meta avatar={<UserAvatar avatarUrl={user.avatarUrl} userName={user.fullName} size={32}/>}
										                title={user.fullName}
										                description={`${review.specialization.name} - ${review.grade.name}`}/>
									</List.Item>
								</Link>
							)}/>
						</Collapse.Panel>
						<Collapse.Panel key="waiting_opinion" header={<Divider style={{ margin: 0 }} orientation="left">Ожидают 360-мнения</Divider>}>
							<List dataSource={waitingOpinion} renderItem={({id, user, review}) => (
								<Link href={`/invitations/${id}`}>
									<List.Item className={styles.list_item}>
										<List.Item.Meta avatar={<UserAvatar avatarUrl={user.avatarUrl} userName={user.fullName} size={32}/>}
										                title={user.fullName} description={`${review.specialization.name} - ${review.grade.name}`}/>
									</List.Item>
								</Link>
							)}/>
						</Collapse.Panel>
						<Collapse.Panel key="completed" header={<Divider style={{ margin: 0 }} orientation="left">Завершенные</Divider>}>
							<List dataSource={completed} renderItem={({id, user, status, review}) => (
								<Link href={`/invitations/${id}`}>
									<List.Item className={styles.list_item}>
										<List.Item.Meta avatar={<UserAvatar avatarUrl={user.avatarUrl} userName={user.fullName} size={32}/>}
										                title={user.fullName} description={`${review.specialization.name} - ${review.grade.name}`}/>
										<span>{status === 'declined' ? <Tag type="error">Отказ</Tag> : <Tag type="success">Принято</Tag>}</span>
									</List.Item>
								</Link>
							)}/>
						</Collapse.Panel>
					</Collapse>
			}
		</>
	);
}