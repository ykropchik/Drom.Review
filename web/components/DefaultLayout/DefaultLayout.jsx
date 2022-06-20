import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Layout, Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styles from './DefaultLayout.module.scss';
import { mainMenu, personalNavMenu } from '../../configs/navMenu';
import usePageLoading from '../../scripts/hooks/usePageLoading';
import Spinner from '../Spinner/Spinner';

export default function DefaultLayout({ children }) {
	const loading = usePageLoading();

	return (
		<Layout>
			<Header mainNavMenu={mainMenu} personalNavItems={personalNavMenu}/>
			<Content className={styles.content}>
				{
					loading ?
						<Spin className={styles.spinner}
						      spinning={loading} indicator={<Spinner size={56} />}/>
						:
						children
				}
			</Content>
			<Footer/>
		</Layout>
	);
}