import React, { createContext, useEffect, useState } from 'react';
import '../public/styles/overwriteAntd.less';
import '../public/styles/global.scss';
import DefaultLayout from '../components/DefaultLayout/DefaultLayout';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import ru_locale from 'antd/lib/locale/ru_RU';
import { SWRConfig, useSWRConfig } from 'swr';

import { useRouter } from 'next/router';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import useData from '../scripts/hooks/useData';
import { EndPoints } from '../scripts/api/EndPoints';
import { SessionProvider } from 'next-auth/react';
export const UserRoleContext = createContext('default');

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	const user = useData(EndPoints.USER);
	const router = useRouter();
	const { cache } = useSWRConfig();
	const [userRole, setUserRole] = useState('default');
	const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

	useEffect(() => {
		if (user.data?.roles.includes('ROLE_SCRUM')) {
			setUserRole('scrum');
		} else if (user.data?.roles.includes('ROLE_LEAD')) {
			setUserRole('lead');
		} else {
			setUserRole('default');
		}
	}, [user.data]);

	return (
		<SessionProvider session={session}>
			<UserRoleContext.Provider value={userRole}>
				<LoadingScreen isLoading={user.isLoading}/>
				{
					getLayout(
						<SWRConfig value={{
							onError: (error) => {
								if (error === 401) {
									cache.clear();
									router.push('/login');
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
			</UserRoleContext.Provider>
		</SessionProvider>
	);
}