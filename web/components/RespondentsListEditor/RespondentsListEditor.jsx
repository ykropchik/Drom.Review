import React, { useEffect, useState } from 'react';
import { Avatar, Input, List } from 'antd';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import styles from './RespondentsListEditor.module.scss';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';

export default function RespondentsListEditor({ value, onChange }) {
	const users = useData(EndPoints.USERS);
	const [notSelectedUsers, setNotSelectedUsers] = useState(users.data?.filter((item) => !value.includes(item.id)) || []);
	const [filteredUsers, setFilteredUsers] = useState(users.data?.filter((item) => !value.includes(item.id)) || []);
	const [selectedUsers, setSelectedUsers] = useState(users.data?.filter((item) => item.id === value) || []);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const notSelectedUsers = users.data?.filter((item) => !value.includes(item.id)) || [];
		setNotSelectedUsers(notSelectedUsers);
		filterUsers(notSelectedUsers, searchValue);
		setSelectedUsers(users.data?.filter((item) => value.includes(item.id)));
	}, [users.data, value]);

	const onInputChangeHandler = ({ target }) => {
		setSearchValue(target.value);
		filterUsers(notSelectedUsers, target.value);
	};

	const onSelectHandler = (user) => {
		if (value) {
			onChange(value.concat([user.id]));
		} else {
			onChange([user.id]);
		}
	};

	const onDeselectHandler = (user) => {
		const newValue = value.filter((item) => item !== user.id );
		onChange(newValue);
	};

	const filterUsers = (list, search) => {
		setFilteredUsers(list.filter((user) => user.fullName.toLowerCase().includes(search.toLowerCase())));
	};

	return (
		<div className={styles.content}>
			<div className={styles.left_side} >
				<h3 className={styles.left_side__title}>Выбранные респонденты:</h3>
				<List className={styles.selected_users_list} dataSource={selectedUsers} renderItem={(item) => (
					<List.Item className={styles.user} actions={[<DeleteOutlined key={'delete-user'}/>]} onClick={() => onDeselectHandler(item)}>
						<Avatar style={{ backgroundColor: '#DB011A'}}>{getAvatarPlaceholder(item.fullName)}</Avatar>
						<span className={styles.username}>{item.fullName}</span>
					</List.Item>
				)}/>
			</div>
			<div className={styles.right_side}>
				<Input placeholder="Имя сотрудника" allowClear suffix={<SearchOutlined/>} onChange={onInputChangeHandler}/>
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