import React from 'react';
import { Button, Form, Modal } from 'antd';

export default function QuestionForm({ visible, title, onSaveClick, onCancelClick, isLoading, saveButtonText = '', initialData = null }) {
	const [form] = Form.useForm();

	const onSaveClickHandler = () => {
		form.validateFields()
			.then(() => onSaveClick(form.getFieldsValue()));
	};

	return (
		<Modal title={title}
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
			<Form>

			</Form>
		</Modal>
	);
}