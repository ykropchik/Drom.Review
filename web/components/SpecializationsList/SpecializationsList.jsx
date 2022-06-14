import * as React from 'react';
import { Collapse, message } from 'antd';
import styles from './SpecializationsList.module.scss';
import { useState } from 'react';
import PanelExtra from '../PanelExtra/PanelExtra';
import SpecializationForm from '../SpecializationForm/SpecializationForm';
import request from '../../scripts/api/request';
import { EndPoints } from '../../scripts/api/EndPoints';
import Hierarchy from '../Hierarchy/Hierarchy';
import { grades } from '../../stubs/grades';
import MarkdownRender from '../MarkdownRender/MarkdownRender';

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
				specializations?.map((item, i) =>
					<Panel header={item.name}
					       key={i}
					       extra={<PanelExtra onEditClick={() => setEditableItem(item)} onRemoveClick={() => onRemoveClick(item)}/>}>
						<div className={styles.panel_content}>
							<div className={styles.left_side}>
								<Hierarchy value={grades} dataIndex="name" defaultSelect={grades[0]}/>
							</div>
							{editableItem !== item && <MarkdownRender mdText={grades[0].description}/>}
						</div>
					</Panel>
				)
			}
			<SpecializationForm visible={editableItem !== null}
			           isLoading={saving}
			           onCancelClick={() => setEditableItem(null)}
			           onSaveClick={onSaveClick}
			           saveButtonText="Сохранить"
			           initialData={editableItem}/>
		</Collapse>
	);
}