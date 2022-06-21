import React from 'react';
import { Button, Form, Modal } from 'antd';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import styles from './SelfReviewForm.module.scss';

export default function SelfReviewForm({ visible, isLoading, title, onCancel, onSave, initialData }) {
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
				<Form.Item name="review">
					<MarkdownEditor className={styles.editor}/>
				</Form.Item>
			</Form>
		</Modal>
	);
}