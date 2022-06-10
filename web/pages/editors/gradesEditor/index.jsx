import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Divider, message, Skeleton } from 'antd';
import styles from '../../../components/GradeEditor/GradesEditor.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import GradesList from '../../../components/GradesList/GradesList';
import NewGradeForm from '../../../components/NewGradeForm/NewGradeForm';
import useGetData from '../../../scripts/hooks/useGetData';
import timeout from '../../../scripts/timeout';
import { grades as gradesStub } from '../../../stubs/grades';
import { specializations as specStub } from '../../../stubs/specializations';

// TODO: Добавить возможность редачить существующие грейды
export default function GradesEditor() {
	const grades = useGetData(async () => {
		await timeout(1500);
		return gradesStub;
	});
	const specializations = useGetData(async () => {
		await timeout(1500);
		return specStub;
	});
	const [isFormVisible, setFormVisible] = useState(false);
	const [creatingGrade, setCreatingGrade] = useState(false);

	useEffect(() => {
		specializations.getData();
		grades.getData();
	}, []);

	const handleCreate = () => {
		setCreatingGrade(true);
		timeout(1000, 40)
			.finally(() => setFormVisible(false))
			.then(() => onCreateSuccess())
			.catch(() => onCreateFailure());
	};


	const onCreateFailure = () => {
		message.error('Произошла ошибка! Попробуйте позже.');
	};

	const onCreateSuccess = () => {
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
						<GradesList grades={grades.data}/>
					</>
			}
			<NewGradeForm visible={isFormVisible}
			              isCreating={creatingGrade}
			              onCancel={() => setFormVisible(false)}
			              onCreate={() => handleCreate()}/>
		</div>
	);
}