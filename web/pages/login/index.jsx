import React from 'react';
import { Button, ConfigProvider, Form, Input, Layout, message } from 'antd';
import { useRouter } from 'next/router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from '../../public/styles/pages/Login.module.scss';
import { useState } from 'react';
import { useSession } from '../../scripts/SessionProvider';

const { Content } = Layout;

export default function Login() {
	const [isLoading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const router = useRouter();
	const { signIn } = useSession();

	const onFinish = (data) => {
		setLoading(true);
		signIn(data)
			.finally(() => setLoading(false))
			.then(() => {
				router.push('/');
			})
			.catch((err) => {
				form.resetFields(['password']);
				message.error(err.message);
			});
	};

	return(
		<Content className={styles.content}>
			<div className={styles.form_container}>
				<span className={styles.form__header}>Войти</span>
				<ConfigProvider componentSize="large">
					<Form className={styles.form}
					      form={form}
					      onFinish={onFinish}>
						<Form.Item name="email"
						           rules={[{ required: true, message: 'Обязательное поле!' }]}>
							<Input placeholder="Почта"/>
						</Form.Item>
						<Form.Item name="password"
						           rules={[{ required: true, message: 'Обязательное поле!' }]}>
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
			<Header clickableLogo={false}/>
			{page}
			<Footer/>
		</Layout>
	);
};