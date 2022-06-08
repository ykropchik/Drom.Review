import * as React from 'react';
import { Button, Form, Input, Select } from 'antd';
import styles from '../../public/styles/pages/Users.module.scss';
import MailInput from '../MailInput/MailInput';
import timeout from '../../scripts/timeout';
import { useState } from 'react';

export default function NewUserForm() {
	const [isLoading, setLoading] = useState(false);

	const createUser = () => {
		setLoading(true);
		timeout(1000, false).finally(() => setLoading(false));
	};

	return (
		<Form wrapperCol={{ flex: '0 1 400px' }}
		      style={{ width: 'auto' }}
		      initialValues={{
			      suffix: 'drom',
		      }}
		      validateTrigger="onBlur"
		      autoComplete="off"
		>
			<Form.Item name="email"
			           className={styles.form_item}
			           rules={[{ required: true, message: 'Укажите адрес электронной почты сотрудника' }]}
			>
				<MailInput placeHolder="Электронная почта"/>
			</Form.Item>
			<Form.Item name="name"
			           className={styles.form_item}
			           rules={[
				           { required: true, message: 'Укажите ФИО сотрудника' },
				           { max: 50, message: 'Максимальная длина: 50 символов' },
			           ]}
			>
				<Input placeHolder="ФИО"/>
			</Form.Item>
			<Form.Item name="password"
			           className={styles.form_item}
			           rules={[
				           { required: true, message: 'Укажите пароль!' },
				           { min: 6, message: 'Минимальная длина: 6 символов' },
				           { max: 15, message: 'Максимальная длина: 15 символов' }
			           ]}
			           hasFeedback>
				<Input.Password placeHolder="Пароль"/>
			</Form.Item>
			<Form.Item name="specialization"
			           className={styles.form_item}
			           rules={[{ required: true, message: 'Укажите адрес электронной почты сотрудника' }]}
			>
				<Select placeholder="Специализация"/>
			</Form.Item>
			<Form.Item name="grade"
			           className={styles.form_item}
			           rules={[{ required: true, message: 'Укажите адрес электронной почты сотрудника' }]}
			>
				<Select placeholder="Грейд"/>
			</Form.Item>
			<Form.Item name="role"
			           className={styles.form_item}
			           rules={[{ required: true, message: 'Укажите адрес электронной почты сотрудника' }]}
			>
				<Select placeholder="Роль"/>
			</Form.Item>
			<Form.Item className={styles.form_item}>
				<Button type="primary"
				        htmlType="submit"
				        loading={isLoading}
				        onClick={createUser}
				>
					{!isLoading && 'Создать пользователя'}
				</Button>
			</Form.Item>
		</Form>
	);
}