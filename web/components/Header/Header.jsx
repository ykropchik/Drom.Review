import * as React from 'react';
import { Header as AntHeader } from 'antd/lib/layout/layout';
import styles from './Header.module.scss';
import MainLogo from '../MainLogo/MainLogo';
import { Dropdown } from 'antd';
import PersonalNavMenu from '../PersonalNavMenu/PersonalNavMenu';

export default function Header({ children, avatar }) {
	return (
		<AntHeader>
			<div className={styles.content}>
				<div className={styles.logo_container}><MainLogo/></div>
				<span className={styles.app_name}>Drom.Review</span>
				{children}
				{avatar &&
					<Dropdown overlay={<PersonalNavMenu/>} placement="bottomLeft" trigger={['click']}>
						<div className={styles.user_avatar}/>
					</Dropdown>
				}
			</div>
		</AntHeader>
	);
}