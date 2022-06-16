import React, { useState } from 'react';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import { Collapse, message } from 'antd';
import GradeForm from '../GradeForm/GradeForm';
import request from '../../scripts/api/request';
import { EndPoints } from '../../scripts/api/EndPoints';
import PanelExtra from '../PanelExtra/PanelExtra';

const { Panel } = Collapse;

export default function GradesList({ grades, onEditSuccess }) {
	const [editableItem, setEditableItem] = useState(null);
	const [saving, setSaving] = useState(false);

	const onRemoveClick = (item) => {
		let msg = message.loading('Удаляем грейд', 0);
		request(EndPoints.GRADES + `/${item.id}`, 'DELETE')
			.then(() => {
				onEditSuccess();
				msg();
				message.success('Грейд успешно удален!');
			})
			.catch(() => onSaveFailure());
	};

	const onSaveClick = (data) => {
		setSaving(true);
		request(EndPoints.GRADES + `/${editableItem.id}`, 'PUT', data)
			.finally(() => {
				setSaving(false);
			})
			.then(() => onSaveSuccess())
			.catch(() => onSaveFailure());
	};

	const onSaveSuccess = () => {
		onEditSuccess();
		setEditableItem(null);
		message.success('Грейд успешно изменен!');
	};

	const onSaveFailure = () => {
		message.error('Произошла ошибка! Попробуйте позже.');
	};

	return (
		<Collapse ghost>
			{
				grades?.map((item, i) =>
					<Panel header={editableItem === i ? '' : item.name}
					       key={i}
					       extra={<PanelExtra onEditClick={() => setEditableItem(item)} onRemoveClick={() => onRemoveClick(item)}/>}>
						<MarkdownRender mdText={item.description}/>
					</Panel>
				)
			}
			<GradeForm visible={editableItem !== null}
			           isLoading={saving}
			           onCancelClick={() => setEditableItem(null)}
			           onSaveClick={onSaveClick}
			           saveButtonText="Сохранить"
			           initialData={editableItem}/>
		</Collapse>
	);
}
