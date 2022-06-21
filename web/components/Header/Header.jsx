import React from 'react';
import { Header as AntHeader } from 'antd/lib/layout/layout';
import styles from './Header.module.scss';
import MainLogo from '../MainLogo/MainLogo';
import Link from 'next/link';
import useWindowSize from '../../scripts/hooks/useWindowSize';
import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import classNames from 'classnames';
import UserAvatar from '../UserAvatar/UserAvatar';
import NavMenu from '../NavMenu/NavMenu';

export default function Header({ mainNavMenu, personalNavItems, clickableLogo = true}) {
	const [isCollapsed, setCollapsed] = useState(true);
	const { width } = useWindowSize();

	const toggleCollapsed = () => {
		setCollapsed(!isCollapsed);
	};

	return (
		<AntHeader>
			<div className={styles.content} style={width < 720 ? { marginLeft: -50 } : {}}>
				{
					width <= 720 &&
					<Button
						type="text"
						onClick={toggleCollapsed}
						style={{
							height: '100%',
							color: 'white',
							fontSize: 24
						}}
					>
						{isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					</Button>
				}
				<div className={classNames(styles.logo_container, {[styles.mobile__logo_container]: width <= 720})}>
					<MainLogo/>
					{
						width > 720 &&
						clickableLogo ?
							<Link href={'/'}>
								<span className={styles.app_name}>Drom.Review</span>
							</Link>
							:
							<span className={styles.app_name} style={{ cursor: 'default' }}>Drom.Review</span>
					}
				</div>
				{
					width > 720 &&
					<>
						{
							mainNavMenu &&
							<div className={styles.left_side}>
								<NavMenu className={styles.main_menu} items={mainNavMenu} mode="horizontal" disabledOverflow/>
							</div>
						}
						{
							personalNavItems &&
							<div className={styles.right_side}>
								<Dropdown overlay={<NavMenu items={personalNavItems}/>} placement="bottomLeft" trigger={['click']} arrow>
									<UserAvatar avatarUrl={null} size={40} style={{ cursor: 'pointer' }}/>
								</Dropdown>
							</div>
						}
					</>
				}
			</div>
			{
				width <= 720 &&
				<NavMenu
					mode="inline"
					className={styles.mobile_menu}
					style={isCollapsed ? {width: 0} : {width: '80%'}}
					theme="dark"
					inlineCollapsed={isCollapsed}
					items={mobileMenuTemplate.concat(mainNavMenu, personalNavItems)}
					onSelect={toggleCollapsed}
				/>
			}
		</AntHeader>
	);
}

const mobileMenuTemplate = [
	{
		key: 'logoName',
		label: <Link href={'/'}><span className={styles.app_name}>Drom.Review</span></Link>
	},
	{
		type: 'divider'
	}
];