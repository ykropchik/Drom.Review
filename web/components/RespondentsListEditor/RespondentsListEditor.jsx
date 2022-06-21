import React, { useState } from 'react';
import { Avatar, Input, List } from 'antd';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import styles from './RespondentsListEditor.module.scss';
import { Users } from '../../stubs/users';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';

export default function RespondentsListEditor({ value, onChange }) {
	const [notSelectedUsers, setNotSelectedUsers] = useState(Users);
	const [filteredUsers, setFilteredUsers] = useState(Users);

	const onChangeHandler = ({ target }) => {
		setFilteredUsers(notSelectedUsers.filter((user) => user.name.toLowerCase().includes(target.value.toLowerCase())));
	};

	const onSelectHandler = (user) => {
		if (value) {
			onChange(value.concat([user]));
		} else {
			onChange([user]);
		}

		const newUsersList = notSelectedUsers.filter((item) => item.name !== user.name);
		setNotSelectedUsers(newUsersList);
		setFilteredUsers(newUsersList);
	};

	const onDeselectHandler = (user) => {
		const newUsersList = notSelectedUsers.concat([user]);
		setNotSelectedUsers(newUsersList);
		setFilteredUsers(newUsersList);
		onChange(value.filter((item) => item.name !== user.name ));
	};

	return (
		<div className={styles.content}>
			<div className={styles.left_side} >
				<h3 className={styles.left_side__title}>Выбранные респонденты:</h3>
				<List className={styles.selected_users_list} dataSource={value} renderItem={(item) => (
					<List.Item className={styles.user} actions={[<DeleteOutlined key={'delete-user'}/>]} onClick={() => onDeselectHandler(item)}>
						<Avatar style={{ backgroundColor: '#DB011A'}}>{getAvatarPlaceholder(item.name)}</Avatar>
						<span className={styles.username}>{item.name}</span>
					</List.Item>
				)}/>
			</div>
			<div className={styles.right_side}>
				<Input placeHolder="Имя сотрудника" allowClear suffix={<SearchOutlined/>} onChange={onChangeHandler}/>
				<List className={styles.searched_users} dataSource={filteredUsers} renderItem={(item) => (
					<List.Item className={styles.user}
					           onClick={() => onSelectHandler(item)}>
						<Avatar style={{ backgroundColor: '#DB011A'}}>{getAvatarPlaceholder(item.name)}</Avatar>
						<span className={styles.username}>{item.name}</span>
					</List.Item>
				)}/>
			</div>
		</div>
	);
}