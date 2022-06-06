import * as React from 'react';
import '../public/styles/overwriteAntd.less';
import '../public/styles/global.scss';
import DefaultLayout from '../components/DefaultLayout/DefaultLayout';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

	return getLayout(
		<>
			<Head>
				<title>My page title</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}