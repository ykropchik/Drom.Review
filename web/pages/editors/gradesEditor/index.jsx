import React from 'react';
import { useState } from 'react';
import { Button, message, PageHeader, Skeleton } from 'antd';
import styles from '../../../public/styles/pages/GradesEditor.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import GradesList from '../../../components/GradesList/GradesList';
import GradeForm from '../../../components/GradeForm/GradeForm';
import request from '../../../scripts/api/request';
import { EndPoints } from '../../../scripts/api/EndPoints';
import useData from '../../../scripts/hooks/useData';
import { useRouter } from 'next/router';

export default function GradesEditor() {
	const grades = useData(EndPoints.GRADES);
	const [isFormVisible, setFormVisible] = useState(false);
	const [creatingGrade, setCreatingGrade] = useState(false);
	const router = useRouter();

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
		<PageHeader title="Грейды" onBack={() => router.push('/editors')}>
			<div className={styles.content}>
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
		</PageHeader>
	);
}