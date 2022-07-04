import * as React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import styles from './UserAvatar.module.scss';

export default function UserAvatar({ avatarUrl, userName, size, editable = false, ...props }) {
	return (
		<div {...props} className={styles.content}>
			{
				avatarUrl
					?
					<Avatar className={styles.avatar} src={avatarUrl} size={size}/>
					:
					<>
						<Avatar className={styles.avatar} size={size}/>
						<span className={styles.avatar__placeholder} style={{ fontSize: `${size*0.4}px`, lineHeight: `${size+1}px` }}>
							{userName && getAvatarPlaceholder(userName)}
						</span>
					</>
			}
			{
				editable &&
				<Dropdown className={styles.edit_button} overlay={<Menu items={editItems}/>} placement="bottomRight" trigger={['click']} arrow={{ pointAtCenter: true }}>
					<Button className={styles.edit_button} type="default" shape="round" icon={<EditOutlined />} >Изменить</Button>
				</Dropdown>
			}
		</div>
	);
}

const editItems = [
	{
		key: 'load',
		label: 'Загрузить'
	},
	{
		key: 'delete',
		label: 'Удалить'
	}
];
