import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Layout, Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styles from './DefaultLayout.module.scss';
import { defaultMainMenu, scrumNavMenu, personalNavMenu } from '../../configs/navMenu';
import usePageLoading from '../../scripts/hooks/usePageLoading';
import Spinner from '../Spinner/Spinner';
import { useSession } from '../../scripts/SessionProvider';

export default function DefaultLayout({ children }) {
	const loading = usePageLoading();
	const { role } = useSession();

	const getNavMenuConfig = () => {
		if (role === 'ROLE_SCRUM') {
			return scrumNavMenu;
		}

		return defaultMainMenu;
	};

	return (
		<Layout>
			<Header mainNavMenu={getNavMenuConfig()} personalNavItems={personalNavMenu}/>
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