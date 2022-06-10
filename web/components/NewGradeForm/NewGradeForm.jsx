import * as React from 'react';
import { Form, Input } from 'antd';
import timeout from '../../scripts/timeout';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import styles from './NewGradeForm.module.scss';
import { useState } from 'react';

export default function NewGradeForm() {
	const [validateStatus, setValidateStatus] = useState(null);

	const validateGradeName = () => {
		setValidateStatus('validating');
		if (Math.floor(Math.random() * 3) === 2) {
			timeout(1000, true)
				.catch(() => setValidateStatus('error'));
		} else {
			timeout(1000, true)
				.catch(() => setValidateStatus('success'));
		}
	};

	return (
		<Form>
			<Form.Item name="gradeName"
			           hasFeedback
			           validateStatus={validateStatus}
			           rules={[
				           () => ({
					           validator(_, value) {
								   if (!value) {
									   setValidateStatus('error');
									   return Promise.reject(new Error('Обязательное поле!'));
								   }

						           validateGradeName(value);
					           },
				           }),
			           ]}>
				<Input placeholder="Название грейда" style={{ maxWidth: 300 }}/>
			</Form.Item>
			<Form.Item name="description">
				<MarkdownEditor className={styles.description_editor}/>
			</Form.Item>
		</Form>
	);
}