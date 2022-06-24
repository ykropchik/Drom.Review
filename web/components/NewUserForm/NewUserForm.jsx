import React from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import styles from './NewUserForm.module.scss';
import MailInput from '../MailInput/MailInput';
import { useState } from 'react';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import { roles } from '../../configs/roles';
import request from '../../scripts/api/request';

export default function NewUserForm() {
	const grades = useData(EndPoints.GRADES);
	const specializations = useData(EndPoints.SPECIALIZATIONS);
	const [isLoading, setLoading] = useState(false);
	const [form] = Form.useForm();

	const createUser = (data) => {
		setLoading(true);
		request(EndPoints.USER, 'POST', data)
			.finally(() => setLoading(false))
			.then(onSuccess)
			.catch(onFail);
	};

	const onSuccess = () => {
		form.resetFields();
		message.success('Новый пользователь успешно создан!');
	};

	const onFail = () => {
		message.error('Произошла ошибка!');
	};

	return (
		<Form wrapperCol={{ flex: '0 1 400px' }}
		      style={{ width: 'auto' }}
		      initialValues={{
			      email: '@drom.ru',
			      role: roles[0]
		      }}
		      validateTrigger="onBlur"
		      autoComplete="off"
		      onFinish={createUser}
		>
			<Form.Item name="email"
			           className={styles.form_item}
			           rules={[{ required: true, message: 'Укажите адрес электронной почты сотрудника' }]}
			>
				<MailInput placeholder="Электронная почта"/>
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
			           rules={[{ required: true, message: 'Укажите специализацию сотрудника' }]}
			>
				<Select placeholder="Специализация" options={specializations.data} fieldNames={{ label: 'name', value: 'id' }} loading={specializations.isLoading}/>
			</Form.Item>
			<Form.Item name="grade"
			           className={styles.form_item}
			           rules={[{ required: true, message: 'Укажите грейд сотрудника' }]}
			>
				<Select placeholder="Грейд" options={grades.data} fieldNames={{ label: 'name', value: 'id' }} loading={grades.isLoading}/>
			</Form.Item>
			<Form.Item name="role"
			           className={styles.form_item}
			           rules={[{ required: true, message: 'Укажите роль сотрудника' }]}
			>
				<Select placeholder="Роль" options={roles}/>
			</Form.Item>
			<Form.Item className={styles.form_item}>
				<Button type="primary"
				        htmlType="submit"
				        loading={isLoading}
				>
					{!isLoading && 'Создать пользователя'}
				</Button>
			</Form.Item>
		</Form>
	);
}