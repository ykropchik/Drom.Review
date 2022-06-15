import * as React from 'react';
import '../public/styles/overwriteAntd.less';
import '../public/styles/global.scss';
import DefaultLayout from '../components/DefaultLayout/DefaultLayout';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import ru_locale from 'antd/lib/locale/ru_RU';

export default function App({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

	return getLayout(
		<ConfigProvider locale={ru_locale}>
			<Head>
				<title>My page title</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</ConfigProvider>
	);
}