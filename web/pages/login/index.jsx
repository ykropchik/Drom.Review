import React from 'react';
import { Button, ConfigProvider, Form, Input, Layout } from 'antd';
import { useRouter } from 'next/router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from '../../public/styles/pages/Login.module.scss';
import { useState } from 'react';
import timeout from '../../scripts/timeout';

const { Content } = Layout;

export default function Login() {
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();

	const onFinish = () => {
		setLoading(true);
		timeout(1000).then(() => router.push('/'));
	};

	return(
		<Content className={styles.content}>
			<div className={styles.form_container}>
				<span className={styles.form__header}>Войти</span>
				<ConfigProvider componentSize="large">
					<Form className={styles.form}
					      onFinish={onFinish}>
						<Form.Item>
							<Input placeholder="Почта"/>
						</Form.Item>
						<Form.Item>
							<Input.Password placeholder="Пароль"/>
						</Form.Item>
						<Form.Item>
							<Button className={styles.submit_button}
							        type="primary"
							        htmlType="submit"
							        loading={isLoading}
							>
								{!isLoading && 'Войти'}
							</Button>
						</Form.Item>
					</Form>
				</ConfigProvider>
			</div>
		</Content>
	);
}

Login.getLayout = function getLayout(page) {
	return (
		<Layout style={{ flex: '1 0 0' }}>
			<Header/>
			{page}
			<Footer>
				<a href={'/signup'} className={styles.reg_link}>У вас нет аккаунта? Зарегистрироваться</a>
			</Footer>
		</Layout>
	);
};