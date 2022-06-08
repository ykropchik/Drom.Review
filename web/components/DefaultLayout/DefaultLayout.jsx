import * as React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styles from './DefaultLayout.module.scss';
import { mainMenu, personalNavMenu } from '../../configs/navMenu';

export default function DefaultLayout({ children }) {
	return (
		<Layout>
			<Header mainNavMenu={mainMenu} personalNavItems={personalNavMenu}/>
			<Content className={styles.content}>
				{children}
			</Content>
			<Footer/>
		</Layout>
	);
}