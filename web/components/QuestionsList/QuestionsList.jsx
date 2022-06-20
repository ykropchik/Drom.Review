import React, { useState } from 'react';
import { List, message } from 'antd';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import Collapse from '../Collapse/Collapse';
import PanelExtra from '../PanelExtra/PanelExtra';
import request from '../../scripts/api/request';
import { EndPoints } from '../../scripts/api/EndPoints';
import QuestionForm from '../QuestionForm/QuestionForm';
import styles from './QuestionsList.module.scss';
import RatingScale from '../RatingScale/RatingScale';

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
				<List.Item className={styles.list_item} extra={<PanelExtra onRemoveClick={() => onRemoveClickHandler(item)} onEditClick={() => onEditClickHandler(item)}/>}>
					<List.Item.Meta title={
						<>
							<Collapse>
								<MarkdownRender mdText={item.text}/>
							</Collapse>

						</>
					} description={<RatingScale title="Шкала оценки:" rating={item.rating}/>}/>
				</List.Item>
			)} />

			<QuestionForm visible={editableQuestion !== null}
			              title="Редактрирование вопроса"
			              onCancelClick={() => setEditableQuestion(null)}
			              onSaveClick={onSaveClickHandler}
			              saveButtonText="Сохранить"
			              initialData={editableQuestion}/>
		</>
	);
}