import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import styles from './GradeForm.module.scss';
import { useEffect } from 'react';
import request from '../../scripts/api/request';
import { EndPoints } from '../../scripts/api/EndPoints';

export default function GradeForm({ visible, onSaveClick, onCancelClick, isLoading, saveButtonText = '', initialData = null }) {
	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
	}, [visible]);

	const validateGradeName = async (_, value) => {
		if (!value) {
			return Promise.reject(new Error('Обязательное поле!'));
		}

		try {
			await request(EndPoints.GRADES, 'POST', { name: value }, { type: 'validate' });
			return  Promise.resolve();
		} catch (e) {
			return Promise.reject(new Error('Грейд с таким именем уже существует!'));
		}
	};

	const onCreateHandler = () => {
		form.validateFields()
			.then(() => {
				onSaveClick(form.getFieldsValue());
			});
	};

	return (
		<Modal className={styles.modal}
		       title="Новый грейд"
		       visible={visible}
		       onCancel={onCancelClick}
		       forceRender
		       footer={[
			       <Button type="primary"
			               key="create-btn"
			               onClick={onCreateHandler}
			               loading={isLoading}
			       >
				       {saveButtonText}
			       </Button>
		       ]}
		>
			<Form form={form} initialValues={initialData}>
				<Form.Item name="name"
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