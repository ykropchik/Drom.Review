import * as React from 'react';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';

export const personalNavMenu = [
	{
		key: 'personal',
		label: <Link href={'/personal'}>Личный кабинет</Link>
	},
	{
		key: 'logout',
		label: <Link href={'/logout'}>Выйти</Link>
	}
];

export const mainMenu = [
	{
		key: 'users',
		label: <Link href={'/users'}>Пользователи</Link>,
		icon: <UserOutlined />
	}
];