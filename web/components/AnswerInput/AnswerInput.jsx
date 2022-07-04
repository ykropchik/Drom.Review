import React from 'react';
import styles from '../../public/styles/pages/Opinion.module.scss';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import { Select, Form } from 'antd';

export default function AnswerInput({ id, question }) {
	return (
		<Form.Item noStyle>
			<div className={styles.question}>
				<MarkdownRender className={styles.question_text} mdText={question.text}/>
				<Form.Item className={styles.question_rating} name={id} rules={[{ required: true, message: 'Выберите ответ' }]}>
					<Select placeholder="Выберите оценку">
						{
							question.rating.map((item, i) =>
								<Select.Option value={item} key={i}>
									{item}
								</Select.Option>
							)
						}
					</Select>
				</Form.Item>
			</div>
		</Form.Item>
	);
}