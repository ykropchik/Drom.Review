import * as React from 'react';
import { Menu } from 'antd';
import styles from './PersonalNavMenu.module.scss';

export default function PersonalNavMenu() {
	return (
		<Menu className={styles.content}>
			<Menu.Item className={styles.menu__item}>
				<a href={'#'}>Личный кабинет</a>
			</Menu.Item>
			<Menu.Item className={styles.menu__item}>
				<a href={'#'}>Выйти</a>
			</Menu.Item>
		</Menu>
	);
}