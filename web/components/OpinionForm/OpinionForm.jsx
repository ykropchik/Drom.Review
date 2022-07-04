import React from 'react';
import { Button, Divider, Form, message } from 'antd';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import styles from './OpinionForm.module.scss';
import AnswerInput from '../AnswerInput/AnswerInput';
import request from '../../scripts/api/request';
import { EndPoints } from '../../scripts/api/EndPoints';
import { useRouter } from 'next/router';

export default function OpinionForm({ opinionId, questions, onSubmit }) {
	const [form] = Form.useForm();
	const router = useRouter();

	const onFinishHandler = ({comment, ...answers}) => {
		onSubmit();
		request(EndPoints.RESPONDENT_OPINIONS(opinionId), 'POST', { answers: answers, comment: comment } )
			.then(() => {
				router.push('/invitations');
				message.success('360-мнение отправлено');
			})
			.catch((err) => message.error(err.message))
			.finally();
	};

	return (
		<Form onFinish={onFinishHandler} form={form}>
			{
				questions.map(({id, question}, i) => (
					<>
						<AnswerInput key={i} id={id} question={question}/>
						{ i !== questions.length - 1 && <Divider/> }
					</>
				))
			}
			<br/>
			<Divider orientation="left">Комментарий (необязательно):</Divider>
			<Form.Item name="comment">
				<MarkdownEditor/>
			</Form.Item>
			<Form.Item>
				<div className={styles.submit_button_container}>
					<Button type="primary" htmlType="submit">Отправить 360-мнение</Button>
				</div>
			</Form.Item>
		</Form>
	);
}