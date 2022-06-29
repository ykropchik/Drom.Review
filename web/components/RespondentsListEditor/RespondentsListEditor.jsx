import React, { useEffect, useState } from 'react';
import { Avatar, Input, List } from 'antd';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import styles from './RespondentsListEditor.module.scss';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';

export default function RespondentsListEditor({ value, onChange }) {
	const users = useData(EndPoints.USERS);
	const [notSelectedUsers, setNotSelectedUsers] = useState(users.data || []);
	const [filteredUsers, setFilteredUsers] = useState(users.data || []);

	useEffect(() => {
		setNotSelectedUsers(users.data || []);
		setFilteredUsers(users.data || []);
	}, [users.data]);

	const onChangeHandler = ({ target }) => {
		setFilteredUsers(notSelectedUsers.filter((user) => user.fullName.toLowerCase().includes(target.value.toLowerCase())));
	};

	const onSelectHandler = (user) => {
		if (value) {
			onChange(value.concat([user]));
		} else {
			onChange([user]);
		}

		const newUsersList = notSelectedUsers.filter((item) => item.fullName !== user.fullName);
		setNotSelectedUsers(newUsersList);
		setFilteredUsers(newUsersList);
	};

	const onDeselectHandler = (user) => {
		const newUsersList = notSelectedUsers.concat([user]);
		setNotSelectedUsers(newUsersList);
		setFilteredUsers(newUsersList);
		onChange(value.filter((item) => item.fullName !== user.fullName ));
	};

	return (
		<div className={styles.content}>
			<div className={styles.left_side} >
				<h3 className={styles.left_side__title}>Выбранные респонденты:</h3>
				<List className={styles.selected_users_list} dataSource={value} renderItem={(item) => (
					<List.Item className={styles.user} actions={[<DeleteOutlined key={'delete-user'}/>]} onClick={() => onDeselectHandler(item)}>
						<Avatar style={{ backgroundColor: '#DB011A'}}>{getAvatarPlaceholder(item.fullName)}</Avatar>
						<span className={styles.username}>{item.fullName}</span>
					</List.Item>
				)}/>
			</div>
			<div className={styles.right_side}>
				<Input placeholder="Имя сотрудника" allowClear suffix={<SearchOutlined/>} onChange={onChangeHandler}/>
				<List className={styles.searched_users} dataSource={filteredUsers} renderItem={(item) => (
					<List.Item className={styles.user}
					           onClick={() => onSelectHandler(item)}>
						<Avatar style={{ backgroundColor: '#DB011A'}}>{getAvatarPlaceholder(item.fullName)}</Avatar>
						<span className={styles.username}>{item.fullName}</span>
					</List.Item>
				)}/>
			</div>
		</div>
	);
}