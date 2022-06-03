import * as React from 'react';
import '../public/styles/global.less';

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}