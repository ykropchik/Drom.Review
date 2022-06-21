import React from 'react';
import { Button, Form, Modal } from 'antd';
import RespondentsListEditor from '../RespondentsListEditor/RespondentsListEditor';
import styles from './RespondentsForm.module.scss';

export default function RespondentsForm({ visible, isLoading, title, onCancel, onSave, initialData = null }) {
	return (
		<Modal className={styles.modal}
		       visible={visible}
		       title={title}
		       onCancel={onCancel}
		       footer={[
			       <Button type="primary"
			               key="create-btn"
			               onClick={onSave}
			               loading={isLoading}
			       >
				       Сохранить
			       </Button>
		       ]}>
	        <Form initialValues={initialData}>
		        <Form.Item name="respondents">
			        <RespondentsListEditor/>
		        </Form.Item>
	        </Form>
		</Modal>
	);
}