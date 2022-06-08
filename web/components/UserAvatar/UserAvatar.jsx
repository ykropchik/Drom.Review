import * as React from 'react';
import styles from './UserAvatar.module.scss';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export default function UserAvatar({ avatarUrl, avatarPlaceholder, size, editable, ...props }) {
	return (
		<div className={styles.content}>
			{
				avatarUrl
					? <Avatar {...props} className={styles.avatar} src={avatarUrl} size={size}/>
					:
					<span {...props} className={styles.avatar} style={{ height: size, width: size }}>
						<span className={styles.avatar__placeholder} style={{  fontSize: size / 2.5, lineHeight: `${size + 1}px`}}>{avatarPlaceholder}</span>
					</span>
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
