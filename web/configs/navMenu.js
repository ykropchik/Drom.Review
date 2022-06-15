import React from 'react';
import Link from 'next/link';
import { EditOutlined, UserOutlined, SnippetsOutlined } from '@ant-design/icons';

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
		key: 'reviews',
		label: <Link href={'/reviews'}>Reviews</Link>,
		icon: <SnippetsOutlined />
	},
	{
		key: 'users',
		label: <Link href={'/users'}>Пользователи</Link>,
		icon: <UserOutlined />
	},
	{
		key: 'editor',
		label: <Link href={'/editors'}>Редакторы</Link>,
		icon: <EditOutlined />
	},
];