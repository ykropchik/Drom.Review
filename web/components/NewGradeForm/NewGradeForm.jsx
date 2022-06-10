import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import timeout from '../../scripts/timeout';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import styles from './NewGradeForm.module.scss';
import { useEffect } from 'react';

export default function NewGradeForm({ visible, onCreate, onCancel, isCreating }) {
	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
	}, [visible]);

	const validateGradeName = async (_, value) => {
		console.log('start validating');
		if (!value) {
			return Promise.reject(new Error('Обязательное поле!'));
		}

		try {
			await timeout(1000, 30);
			console.log('Valid!');
			return  Promise.resolve();
		} catch (e) {
			console.log('Invalid');
			return Promise.reject(new Error('Грейд с таким именем уже существует!'));
		}
	};

	const onCreateHandler = () => {
		form.validateFields()
			.then(() => {
				onCreate();
			});
	};

	return (
		<Modal className={styles.modal}
		       title="Новый грейд"
		       visible={visible}
		       onCancel={onCancel}
		       footer={[
			       <Button type="primary"
			               key="create-btn"
			               onClick={onCreateHandler}
			               loading={isCreating}
			       >
				       Создать
			       </Button>
		       ]}
		>
			<Form form={form}>
				<Form.Item name="gradeName"
				           hasFeedback
				           rules={[
					           // { required: true, message: 'Обязательное поле' },
					           { validator: validateGradeName }
				           ]}>
					<Input placeholder="Название грейда" style={{ maxWidth: 300 }}/>
				</Form.Item>
				<Form.Item name="description">
					<MarkdownEditor className={styles.description_editor}/>
				</Form.Item>
			</Form>
		</Modal>
	);
}