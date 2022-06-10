import React from 'react';
import styles from '../../../components/GradeEditor/GradesEditor.module.scss';
import MarkdownRender from '../../../components/MarkdownRender/MarkdownRender';
import { PlusOutlined } from '@ant-design/icons';

export default function SpecEditor() {
	return (
		<span>placeholder</span>
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