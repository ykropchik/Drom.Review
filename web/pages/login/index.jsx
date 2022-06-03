import * as React from 'react';
import { Button, Form, Input, Layout } from 'antd';
const { Content } = Layout;
import { useRouter } from 'next/router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from '../../public/styles/Login.module.scss';

export default function Login() {
	const router = useRouter();

	return(
		<Layout style={{ flex: '1 0 0' }}>
			<Header/>
			<Content className={styles.content}>
				<div className={styles.form_container}>
					<span className={styles.form__header}>Войти</span>
					<Form className={styles.form} onFinish={() => router.push('/')}>
						<Form.Item>
							<Input placeholder="Почта"/>
						</Form.Item>
						<Form.Item>
							<Input placeholder="Пароль"/>
						</Form.Item>
						<Form.Item>
							<Button className={styles.submit_button} type="primary" htmlType="submit">Войти</Button>
						</Form.Item>
					</Form>
				</div>
			</Content>
			<Footer>
				<a className={styles.reg_link}>Нет аккаунта? Зарегистрируйся</a>
			</Footer>
		</Layout>
	);
}