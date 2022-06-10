import React from 'react';
import { useRouter } from 'next/router';
import { Button, ConfigProvider, Form, Input, Layout } from 'antd';
import Header from '../../components/Header/Header';
import styles from '../../public/styles/pages/Login.module.scss';
import Footer from '../../components/Footer/Footer';
import MailInput from '../../components/MailInput/MailInput';
import { useState } from 'react';
const { Content } = Layout;

export default function Signup() {
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();

	const timeout = async () => {
		await new Promise(resolve => setTimeout(resolve, 1000));
	};

	const onFinish = () => {
		setLoading(true);
		timeout().then(() => router.push('/'));
	};

	return(
		<Content className={styles.content}>
			<div className={styles.form_container}>
				<span className={styles.form__header}>Регистрация</span>
				<ConfigProvider componentSize="large">
					<Form className={styles.form}
					      onFinish={onFinish}
					      initialValues={{
						      suffix: 'drom',
					      }}
					      validateTrigger="onBlur"
					      autoComplete="off"
					>
						<Form.Item name="email"
						           rules={[{ required: true, message: 'Укажите адрес электронной почты!' }]}
						>
							<MailInput/>
						</Form.Item>
						<Form.Item name="name"
						           rules={[
									   { required: true, message: 'Укажите ваше ФИО!' },
							           { max: 50, message: 'Максимальная длина: 50 символов' },
						           ]}
						>
							<Input placeholder="ФИО"/>
						</Form.Item>
						<Form.Item name="password"
						           rules={[
									   { required: true, message: 'Укажите пароль!' },
							           { min: 6, message: 'Минимальная длина: 6 символов' },
							           { max: 15, message: 'Максимальная длина: 15 символов' }
						           ]}
						           hasFeedback>
							<Input.Password placeholder="Пароль"/>
						</Form.Item>
						<Form.Item name="confirmPassword"
						           rules={[
							           { required: true, message: 'Подтвердите пароль!' },
							           ({ getFieldValue }) => ({
								           validator(_, value) {
									           if (!value || getFieldValue('password') === value) {
										           return Promise.resolve();
									           }

									           return Promise.reject(new Error('Пароли не совпадают!'));
								           },
							           }),
						           ]}
						           hasFeedback>
							<Input.Password placeholder="Повторите пароль"/>
						</Form.Item>
						<Form.Item>
							<Button className={styles.submit_button}
							        type="primary"
							        htmlType="submit"

							        loading={isLoading}
							>
								{!isLoading && 'Зарегестрироваться'}
							</Button>
						</Form.Item>
					</Form>
				</ConfigProvider>
			</div>
		</Content>
	);
}

Signup.getLayout = function getLayout(page) {
	return (
		<Layout style={{ flex: '1 0 0' }}>
			<Header/>
			{page}
			<Footer>
				<a href={'/login'} className={styles.reg_link}>Уже есть аккаунт? Авторизоваться</a>
			</Footer>
		</Layout>
	);
};