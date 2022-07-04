import React, { useEffect, useState } from 'react';
import '../public/styles/overwriteAntd.less';
import '../public/styles/global.scss';
import DefaultLayout from '../components/DefaultLayout/DefaultLayout';
import Head from 'next/head';
import { ConfigProvider, Spin } from 'antd';
import ru_locale from 'antd/lib/locale/ru_RU';
import { SWRConfig, useSWRConfig } from 'swr';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import SessionProvider from '../scripts/SessionProvider';
import { LoadingOutlined } from '@ant-design/icons';

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 32 }} spin />);
ru_locale.Empty.description = 'Пусто';

export default function App({ Component, pageProps }) {
	const [isSessionLoading, setSessionLoading] = useState(true);
	const [user, setUser] = useState(null);
	const { cache } = useSWRConfig();
	const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('currentUser')));
		setSessionLoading(false);
	}, []);

	const config = {
		loginRoute: '/login',
		defaultRoute: '/',
		routes: {
			'/': {
				forbiddenRoles: ['ROLE_SCRUM'],
				redirectRoute: '/reviews',
			},
			'/reviews': {
				allowedRoles: ['ROLE_SCRUM'],
				redirectRoute: '/404',
			},
			'/users': {
				allowedRoles: ['ROLE_SCRUM'],
				redirectRoute: '/404',
			},
			'/editors': {
				allowedRoles: ['ROLE_SCRUM'],
				redirectRoute: '/404',
			}
		}
	};

	return (
		<SessionProvider user={user}
		                 isLoading={isSessionLoading}
		                 onLogin={(user) => setUser(user)}
		                 onLogout={() => setUser(null)}
		                 config={config}>
			<LoadingScreen isLoading={isSessionLoading}/>
			{
				getLayout(
					<SWRConfig value={{
						onError: (error) => {
							if (error === 401) {
								cache.clear();
								setUser(null);
							}
						}
					}}>

						<ConfigProvider locale={ru_locale}>
							<Head>
								<title>My page title</title>
								<meta name="viewport" content="initial-scale=1.0, width=device-width" />
							</Head>
							<Component {...pageProps} />
						</ConfigProvider>

					</SWRConfig>
				)
			}
		</SessionProvider>
	);
}