import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import RatingScaleEditor from '../RatingScaleEditor/RatingScaleEditor';
import styles from './QuestionForm.module.scss';

export default function QuestionForm({ visible, title, onSaveClick, onCancelClick, isLoading = false, saveButtonText = '', initialData = null }) {
	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
	}, [visible]);

	const onSaveClickHandler = () => {
		form.validateFields()
			.then(() => onSaveClick(form.getFieldsValue()));
	};

	return (
		<Modal className={styles.modal}
		       title={title}
		       visible={visible}
		       onCancel={onCancelClick}
		       forceRender
		       footer={[
			       <Button type="primary"
			               key="create-btn"
			               onClick={onSaveClickHandler}
			               loading={isLoading}
			       >
				       {saveButtonText}
			       </Button>
		       ]}
		>
			<Form form={form} initialValues={initialData}>
				<h3>Текст вопроса:</h3>
				<Form.Item name="text">
					<MarkdownEditor/>
				</Form.Item>
				<h3>Шкала оценки:</h3>
				<Form.Item name="rating">
					<RatingScaleEditor/>
				</Form.Item>
			</Form>
		</Modal>
	);
}