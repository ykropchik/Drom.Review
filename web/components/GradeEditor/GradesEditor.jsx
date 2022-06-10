import * as React from 'react';
import { Button, Collapse, Divider, Skeleton, message } from 'antd';
import { grades as gradesStub } from '../../stubs/grades';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import styles from './GradesEditor.module.scss';
import { useEffect, useState } from 'react';
import timeout from '../../scripts/timeout';
import { specializations as specStub } from '../../stubs/specializations';
import useGetData from '../../scripts/hooks/useGetData';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import NewGradeForm from '../NewGradeForm/NewGradeForm';
import GradesList from '../GradesList/GradesList';


// TODO: добавить спинер при загрузке грейдов
// TODO: добавить фильтры и сортировки

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
		// <Tabs className={styles.content}>
		// 	<TabPane tab={<TabPaneItem title="Список" icon={<TableOutlined />}/>} key="table">
		//
		// 	</TabPane>
		// 	{/*TODO вынести представление с иерархией в раздел "Редактор специализаций"*/}
		// 	<TabPane tab={<TabPaneItem title="Иерархия" icon={<ApartmentOutlined />}/>} key="hierarchy">
		// 		<Select className={styles.spec_select}
		// 		        placeholder="Выберите специализацию"
		// 		        loading={specializations.isLoading}
		// 		        onSelect={onSelectHandler}>
		// 			{specializations.data && specializations.data.map((item, i) => <Option value={item} key={i}>{item}</Option>)}
		// 		</Select>
		// 		<div className={styles.hierarchy_view}>
		// 			{
		// 				grades.data &&
		// 				<Hierarchy items={grades.data}
		// 				           dataIndex="name"
		// 				           onItemClick={selectGrade}
		// 				           defaultSelect={grades.data[0]}/>
		// 			}
		// 			{
		// 				selectedGrade &&
		// 				<MarkdownRender className={styles.description_view} mdText={`# ${selectedGrade.name}\n ${selectedGrade.description}`}/>
		// 			}
		// 		</div>
		// 	</TabPane>
		// 	<TabPane tab={<TabPaneItem title="Создать новый" icon={<PlusOutlined />}/>} key="newGrade">
		// 		{/*<NewGradeForm/>*/}
		// 	</TabPane>
		// </Tabs>
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

const columns = [
	{
		title: 'Название',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Специализация',
		dataIndex: 'specialization',
		key: 'specialization'
	},
	{
		title: 'Предыдущий грейд',
		dataIndex: 'previous',
		key: 'previous',
		render: (data) => data || <b className={styles.not_set_label}>Не задан</b>
	},
	{
		title: 'Следующий грейд',
		dataIndex: 'next',
		key: 'next',
		render: (data) => data || <b className={styles.not_set_label}>Не задан</b>
	}
];