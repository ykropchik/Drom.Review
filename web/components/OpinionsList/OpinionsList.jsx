import React, { useState } from 'react';
import { Button, List, Modal, Spin } from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './OpinionsList.module.scss';
import OpinionView from '../OpinionView/OpinionView';
import request from '../../scripts/api/request';
import { EndPoints } from '../../scripts/api/EndPoints';

export default function OpinionsList({ list }) {
	const [selectedItem, setSelectedItem] = useState(null);
	const [opinion, setOpinion] = useState(null);
	const [opinionLoading, setOpinionLoading] = useState(false);

	const onItemClickHandler = (item) => {
		setOpinionLoading(true);
		setSelectedItem(item);
		request(EndPoints.RESPONDENT_OPINION(item.id))
			.then((data) => setOpinion(data))
			.catch((err) => console.log(err))
			.finally(() => setOpinionLoading(false));
	};

	const onCloseModalHandler = () => {
		setSelectedItem(null);
	};

	return (
		<>
			<List itemLayout="horizontal"
			      dataSource={list || []} renderItem={(item) => <OpinionsList.Item data={item} onClick={() => onItemClickHandler(item)}/>}>
			</List>
			<Modal className={styles.respondent_opinion}
			       title="360-мнение"
			       visible={selectedItem !== null}
			       onCancel={onCloseModalHandler}
			       footer={<Button onClick={onCloseModalHandler} type="primary">Назад</Button>}>
				{
					opinionLoading ?
						<Spin/>
						:
						<OpinionView opinion={opinion}/>
				}
			</Modal>
		</>
	);
}

OpinionsList.Item = ({ data, onClick }) => {
	return (
		<List.Item className={styles.item_content}>
			<UserAvatar avatarUrl={data.user.avatarUrl} userName={data.user.fullName} size={32}/>
			<span className={styles.respondent_name} onClick={onClick}>{data.user.fullName}</span>
		</List.Item>
	);
};

OpinionsList.Item.displayName = 'OpinionsList.Item';