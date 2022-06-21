import React, { useState } from 'react';
import { Button, List, Modal } from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './OpinionsList.module.scss';
import MarkdownRender from '../MarkdownRender/MarkdownRender';

export default function OpinionsList({ list }) {
	const [selectedItem, setSelectedItem] = useState(null);

	const onItemClickHandler = (item) => {
		setSelectedItem(item);
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
			       visible={selectedItem !== null}
			       onCancel={onCloseModalHandler}
			       footer={<Button onClick={onCloseModalHandler} type="primary">Назад</Button>}>
				<MarkdownRender mdText={selectedItem?.text}/>
			</Modal>
		</>
	);
}

OpinionsList.Item = ({ data, onClick }) => {
	return (
		<List.Item className={styles.item_content}>
			<UserAvatar avatarUrl={data.avatarUrl} userName={data.name} size={32}/>
			<span className={styles.respondent_name} onClick={onClick}>{data.name}</span>
		</List.Item>
	);
};

OpinionsList.Item.displayName = 'OpinionsList.Item';