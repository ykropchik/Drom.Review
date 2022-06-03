import * as React from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, Layout } from 'antd';
import Header from '../../components/Header/Header';
import styles from '../../public/styles/Login.module.scss';
import Footer from '../../components/Footer/Footer';
const { Content } = Layout;

export default function Signup() {
	const router = useRouter();

	return(
		<Layout style={{ flex: '1 0 0' }}>
			<Header/>
			<Content className={styles.content}>
				<div className={styles.form_container}>
					<span className={styles.form__header}>Регистрация</span>
					<Form className={styles.form} onFinish={() => router.push('/')}>
						<Form.Item>
							<Input placeholder="Почта"/>
						</Form.Item>
						<Form.Item>
							<Input placeholder="ФИО"/>
						</Form.Item>
						<Form.Item>
							<Input placeholder="Пароль"/>
						</Form.Item>
						<Form.Item>
							<Input placeholder="Повторите пароль"/>
						</Form.Item>
						<Form.Item>
							<Button className={styles.submit_button} type="primary" htmlType="submit">Зарегестрироваться</Button>
						</Form.Item>
					</Form>
				</div>
			</Content>
			<Footer/>
		</Layout>
	);
}