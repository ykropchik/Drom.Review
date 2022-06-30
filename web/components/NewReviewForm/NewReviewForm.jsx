import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import styles from './NewReviewForm.module.scss';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import request from '../../scripts/api/request';
import QualificationSelect from '../QualificationSelect/QualificationSelect';
import UserSelect from '../UserSelect/UserSelect';

export default function NewReviewForm({ onCreate }) {
	const users = useData(EndPoints.USERS);
	const [selectedUser, setSelectedUser] = useState(null);
	const [creating, setCreating] = useState(false);
	const [form] = Form.useForm();

	const onSelectHandler = (user) => {
		if (user === null) {
			form.resetFields();
		}

		setSelectedUser(user);
	};

	const onFinish = (data) => {
		setCreating(true);
		request(EndPoints.REVIEW, 'POST', data)
			.finally(() => setCreating(false))
			.then((res) => {
				form.resetFields();
				message.success(res.message);
				onCreate();
			})
			.catch((err) => message.error(err.message));
	};

	return (
		<Form wrapperCol={{ flex: '0 1 400px' }}
		      style={{ width: 'auto' }}
		      form={form}
		      validateTrigger="onBlur"
		      autoComplete="off"
		      onFinish={onFinish}
		>
			<Form.Item className={styles.form_item} name="subject">
				<UserSelect isLoading={users.isLoading}
				            data={users.data}
				            placeholder="Выберите сотрудника"
				            onSelect={onSelectHandler}/>
			</Form.Item>
			<Form.Item className={styles.form_item} name="qualification">
				<QualificationSelect data={selectedUser?.qualifications} disabled={!selectedUser}/>
			</Form.Item>
			<Form.Item className={styles.form_item} name="lead">
				<UserSelect isLoading={users.isLoading}
				            disabled={!selectedUser}
				            data={users.data}
				            placeholder="Выберите ответственного за проверку"
				            onSelect={onSelectHandler}/>
			</Form.Item>
			<Form.Item className={styles.form_item}>
				<Button htmlType="submit" type="primary" loading={creating}>Создать</Button>
			</Form.Item>
		</Form>
	);
}