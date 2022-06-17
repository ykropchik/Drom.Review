import React, { useState } from 'react';
import { List, message } from 'antd';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import Collapse from '../Collapse/Collapse';
import PanelExtra from '../PanelExtra/PanelExtra';
import request from '../../scripts/api/request';
import { EndPoints } from '../../scripts/api/EndPoints';
import QuestionForm from '../QuestionForm/QuestionForm';

export default function QuestionsList({ className, questions, onChange }) {
	const [editableQuestion, setEditableQuestion] = useState(null);

	const onRemoveClickHandler = (question) => {
		request(EndPoints.QUESTIONS + `/${question.id}`, 'DELETE')
			.then(() => {
				onChange();
				message.success('Вопрос успешно удален!');
			})
			.catch(() => message.error('Произошла ошибка!'));
	};

	const onEditClickHandler = (question) => {
		setEditableQuestion(question);
	};

	const onSaveClickHandler = () => {

	};

	return (
		<>
			<List className={className} style={{ width: '100%'}} dataSource={questions} renderItem={(item) => (
				<List.Item extra={<PanelExtra onRemoveClick={() => onRemoveClickHandler(item)} onEditClick={() => onEditClickHandler(item)}/>}>
					<List.Item.Meta description={<Collapse><MarkdownRender mdText={item.text}/></Collapse>}/>
				</List.Item>
			)} />
			<QuestionForm visible={!!editableQuestion}
			              title="Редактрирование вопроса"
			              onCancelClick={() => setEditableQuestion(null)} onSaveClick={onSaveClickHandler}
			              saveButtonText="Сохранить"/>
		</>
	);
}