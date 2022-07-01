import React from 'react';
import { Button, Form, Modal } from 'antd';
import RespondentsListEditor from '../RespondentsListEditor/RespondentsListEditor';
import styles from './RespondentsForm.module.scss';
import { useForm } from 'antd/es/form/Form';

export default function RespondentsForm({ visible, isLoading, title, onCancel, onSave, initialData = [] }) {
	const [form] = useForm();

	const validateRespondentsList = (_, value) => {
		if (value.length === 0) {
			return Promise.reject(new Error('Список респондентов не может быть пустым'));
		}

		return Promise.resolve();
	};

	return (
		<Modal className={styles.modal}
		       visible={visible}
		       title={title}
		       onCancel={onCancel}
		       footer={[
			       <Button type="primary"
			               key="create-btn"
			               onClick={() => onSave(form.getFieldsValue())}
			               loading={isLoading}
			       >
				       Сохранить
			       </Button>
		       ]}>
	        <Form initialValues={initialData} form={form} validateTrigger={['onChange']}>
		        <Form.Item name="respondents" rules={[{ validator: validateRespondentsList }]}>
			        <RespondentsListEditor/>
		        </Form.Item>
	        </Form>
		</Modal>
	);
}