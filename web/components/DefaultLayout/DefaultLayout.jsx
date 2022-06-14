import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Layout, Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styles from './DefaultLayout.module.scss';
import { mainMenu, personalNavMenu } from '../../configs/navMenu';
import { LoadingOutlined } from '@ant-design/icons';
import usePageLoading from '../../scripts/hooks/usePageLoading';
const indicator = <LoadingOutlined className={styles.spinner__indicator} spin/>;

export default function DefaultLayout({ children }) {
	const loading = usePageLoading();

	return (
		<Layout>
			<Header mainNavMenu={mainMenu} personalNavItems={personalNavMenu}/>
			<Content className={styles.content}>
				{
					loading ?
						<Spin className={styles.spinner}
						      spinning={loading} indicator={indicator}/>
						:
						children
				}
			</Content>
			<Footer/>
		</Layout>
	);
}