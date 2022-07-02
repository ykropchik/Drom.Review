import React from 'react';
import { Button, Form, Modal } from 'antd';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import styles from './SelfReviewForm.module.scss';
import { useForm } from 'antd/es/form/Form';

export default function SelfReviewForm({ visible, isLoading, title, onCancel, onSave, initialData }) {
	const [form] = useForm();

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
			<Form initialValues={initialData} form={form}>
				<Form.Item name="selfReview">
					<MarkdownEditor className={styles.editor}/>
				</Form.Item>
			</Form>
		</Modal>
	);
}