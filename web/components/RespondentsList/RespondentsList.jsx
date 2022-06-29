import React from 'react';
import { List, Divider } from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import Link from 'next/link';
import RespondentStatusTag from '../RespondentStatusTag/RespondentStatusTag';
import styles from './RespondentsList.module.scss';

export default function RespondentsList({ list }) {
	return (
		<List itemLayout="horizontal"
		      dataSource={list || []} renderItem={(item) => <RespondentsList.Item data={item}/>}>
		</List>
	);
}

RespondentsList.Item = ({ data }) => {
	return (
	// TODO: раскомментировать после добавления комментариев к респондентам
	// <List.Item>
	// 	<List.Item.Meta
	// 		avatar={<UserAvatar avatarUrl={data.avatarUrl} user={data.name} size={32}/>}
	// 		title={
	// 			<>
	// 				<Link href={`/user/${data.id}`}>
	// 					{data.name}
	// 		 	 	</Link>
	// 				<Divider type="vertical"/>
	// 				<RespondentStatusTag status={data.status}/>
	// 			</>
	// 		}
	// 		description={data.description}
	// 	/>
	// </List.Item>

		<List.Item className={styles.item_content}>
			<UserAvatar avatarUrl={data.avatarUrl} userName={data.name} size={32}/>
			<Link href={`/user/${data.id}`}>
				<span className={styles.respondent_name}>{data.name}</span>
			</Link>
			<Divider type="vertical"/>
			<RespondentStatusTag status={data.status}/>
		</List.Item>
	);
};

RespondentsList.Item.displayName = 'RespondentsList.Item';