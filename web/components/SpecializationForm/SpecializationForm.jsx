import React, { useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import styles from '../GradeForm/GradeForm.module.scss';
import request from '../../scripts/api/request';
import { EndPoints } from '../../scripts/api/EndPoints';
import { grades } from '../../stubs/grades';
import SpecializationGradesEditor from '../SpecializationGradesEditor/SpecializationGradesEditor';

export default function SpecializationForm({ visible, onSaveClick, onCancelClick, isLoading, saveButtonText = '', initialData = null }) {
	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
	}, [visible]);

	const validateSpecName = async (_, value) => {
		if (!value) {
			return Promise.reject(new Error('Обязательное поле!'));
		}

		try {
			await request(EndPoints.VALIDATE_SPECIALIZATION, 'POST', { name: value });
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
					           { validator: validateSpecName }
				           ]}>
					<Input placeholder="Название грейда" style={{ maxWidth: 300 }}/>
				</Form.Item>
				<Form.Item name="grades" initialValue={grades}>
					<SpecializationGradesEditor allGrades={grades}/>
				</Form.Item>
			</Form>
		</Modal>
	);
}