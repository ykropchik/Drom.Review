import React from 'react';
import Link from 'next/link';
import {
	EditOutlined, UserOutlined,
	SnippetsOutlined, UserSwitchOutlined
} from '@ant-design/icons';

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

export const scrumNavMenu = [
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

export const defaultMainMenu = [
	{
		key: 'reviews',
		label: <Link href={'/'}>Reviews</Link>,
		icon: <SnippetsOutlined />
	},
	{
		key: 'invitations',
		label: <Link href={'/invitations'}>Приглашения</Link>,
		icon: <UserSwitchOutlined />
	}
];