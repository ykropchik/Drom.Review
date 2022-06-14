import React from 'react';
import { useState } from 'react';
import { Button, Divider, message, Skeleton } from 'antd';
import styles from '../../../components/GradeEditor/GradesEditor.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import GradesList from '../../../components/GradesList/GradesList';
import GradeForm from '../../../components/NewGradeForm/GradeForm';
import useGrades from '../../../scripts/hooks/useGrades';
import request from '../../../scripts/api/request';
import { EndPoints } from '../../../scripts/api/EndPoints';

export default function GradesEditor() {
	const grades = useGrades();
	const [isFormVisible, setFormVisible] = useState(false);
	const [creatingGrade, setCreatingGrade] = useState(false);

	const handleCreate = (data) => {
		setCreatingGrade(true);
		request(EndPoints.GRADES, 'POST', data)
			.finally(() => {
				setCreatingGrade(false);
			})
			.then(() => onCreateSuccess())
			.catch(() => onCreateFailure());
	};

	const onCreateFailure = () => {
		message.error('Произошла ошибка! Попробуйте позже.');
	};

	const onCreateSuccess = () => {
		grades.update();
		setFormVisible(false);
		message.success('Новый грейд создан!');
	};

	return (
		<div className={styles.content}>
			<Divider orientation="left">Грейды</Divider>
			{
				grades.isLoading
					?
					<div className={styles.skeleton_container}>
						<Skeleton.Button active size="default" shape="square" block={false} />
						<Skeleton active/>
						<Skeleton active/>
					</div>
					:
					<>
						<Button icon={<PlusOutlined />} type="dashed" style={{ margin: '8px 16px' }} onClick={() => setFormVisible(true)}>Создать новый</Button>
						<GradesList grades={grades.list} onEditSuccess={() => grades.update()}/>
					</>
			}
			<GradeForm visible={isFormVisible}
			           isLoading={creatingGrade}
			           saveButtonText="Создать"
			           onCancelClick={() => setFormVisible(false)}
			           onSaveClick={handleCreate}/>
		</div>
	);
}