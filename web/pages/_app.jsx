import React, { createContext } from 'react';
import '../public/styles/overwriteAntd.less';
import '../public/styles/global.scss';
import DefaultLayout from '../components/DefaultLayout/DefaultLayout';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import ru_locale from 'antd/lib/locale/ru_RU';
import { SWRConfig, useSWRConfig } from 'swr';

import { useRouter } from 'next/router';
export const UserRoleContext = createContext('default');

export default function App({ Component, pageProps }) {
	const router = useRouter();
	const { cache } = useSWRConfig();
	const [userRole] = React.useState('scrum');
	const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

	return (
		<UserRoleContext.Provider value={userRole}>
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
	);
}