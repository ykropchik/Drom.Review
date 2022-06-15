import * as React from 'react';
import { Collapse, message } from 'antd';
import { useState } from 'react';
import PanelExtra from '../PanelExtra/PanelExtra';
import SpecializationForm from '../SpecializationForm/SpecializationForm';
import request from '../../scripts/api/request';
import { EndPoints } from '../../scripts/api/EndPoints';
import SpecializationGradesView from '../SpecializationGradesView/SpecializationGradesView';

const { Panel } = Collapse;

export default function SpecializationsList({ specializations, onEditSuccess }) {
	const [editableItem, setEditableItem] = useState(null);
	const [saving, setSaving] = useState(false);

	const onRemoveClick = (item) => {
		let msg = message.loading('Удаляем грейд', 0);
		request(EndPoints.SPECIALIZATIONS + `/${item.id}`, 'DELETE')
			.finally(() => msg())
			.then(() => {
				onEditSuccess();
				message.success('Грейд успешно удален!');
			})
			.catch(onSaveFailure);
	};

	const onSaveClick = (data) => {
		setSaving(true);
		request(EndPoints.SPECIALIZATIONS + `/${editableItem.id}`, 'PUT', data)
			.finally(() => {
				setSaving(false);
			})
			.then(onSaveSuccess)
			.catch(onSaveFailure);
	};

	const onSaveSuccess = () => {
		onEditSuccess();
		setEditableItem(null);
		message.success('Грейд успешно изменен!');
	};

	const onSaveFailure = (err) => {
		console.log(err);
		message.error('Произошла ошибка! Попробуйте позже.');
	};

	return (
		<>
			<Collapse ghost>
				{
					specializations?.map((item, i) =>
						<Panel header={item.name}
						       key={i}
						       extra={<PanelExtra onEditClick={() => setEditableItem(item)} onRemoveClick={() => onRemoveClick(item)}/>}>
							<SpecializationGradesView specialization={item} defaultSelect={item.grades[0]}/>
						</Panel>
					)
				}
			</Collapse>
			<SpecializationForm visible={editableItem !== null}
			           isLoading={saving}
			           onCancelClick={() => setEditableItem(null)}
			           onSaveClick={onSaveClick}
			           saveButtonText="Сохранить"
			           initialData={editableItem}/>
		</>
	);
}