import * as React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Content } from 'antd/lib/layout/layout';

export default function Main() {
	return (
		<Layout>
			<Header avatar={true}></Header>
			<Content></Content>
			<Footer></Footer>
		</Layout>
	);
}