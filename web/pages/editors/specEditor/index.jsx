import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Skeleton } from 'antd';
import styles from '../../../public/styles/pages/SpecEditor.module.scss';
import SpecializationsList from '../../../components/SpecializationsList/SpecializationsList';
import request from '../../../scripts/api/request';
import { EndPoints } from '../../../scripts/api/EndPoints';
import SpecializationForm from '../../../components/SpecializationForm/SpecializationForm';
import useData from '../../../scripts/hooks/useData';

export default function SpecEditor() {
	const specializations = useData(EndPoints.SPECIALIZATIONS_FULL);
	const [isFormVisible, setFormVisible] = useState(false);
	const [creatingSpec, setCreatingSpec] = useState(false);

	const handleCreate = (data) => {
		setCreatingSpec(true);
		request(EndPoints.GRADES, 'POST', data)
			.finally(() => {
				setCreatingSpec(false);
			})
			.then(() => onCreateSuccess())
			.catch(() => onCreateFailure());
	};

	const onCreateFailure = () => {
		message.error('Произошла ошибка! Попробуйте позже.');
	};

	const onCreateSuccess = () => {
		specializations.update();
		setFormVisible(false);
		message.success('Новая специализация создана!');
	};

	return (
		<div className={styles.content}>
			<Divider orientation="left">Специализации</Divider>
			{
				specializations.isLoading
					?
					<div className={styles.skeleton_container}>
						<Skeleton.Button active size="default" shape="square" block={false} />
						<Skeleton active/>
						<Skeleton active/>
					</div>
					:
					<>
						<Button icon={<PlusOutlined />} type="dashed" style={{ margin: '8px 16px' }} onClick={() => setFormVisible(true)}>Создать новую</Button>
						<SpecializationsList specializations={specializations.list} onEditSuccess={() => specializations.update()}/>
					</>
			}
			<SpecializationForm visible={isFormVisible}
			           isLoading={creatingSpec}
			           saveButtonText="Создать"
			           onCancelClick={() => setFormVisible(false)}
			           onSaveClick={handleCreate}/>
		</div>
	);
}