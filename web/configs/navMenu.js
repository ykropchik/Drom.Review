import * as React from 'react';
import Link from 'next/link';

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