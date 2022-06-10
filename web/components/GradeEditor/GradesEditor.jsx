import * as React from 'react';
import { Button, Collapse, Divider, Form, Modal, Select, Spin, Table, Tabs } from 'antd';
import { grades as gradesStub } from '../../stubs/grades';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import styles from './GradesEditor.module.scss';
import TabPaneItem from '../TabPaneItem/TabPaneItem';
import Hierarchy from '../Hierarchy/Hierarchy';
import { useEffect, useState } from 'react';
import timeout from '../../scripts/timeout';
import { specializations as specStub } from '../../stubs/specializations';
import useGetData from '../../scripts/hooks/useGetData';
import { ApartmentOutlined, LoadingOutlined, TableOutlined, PlusOutlined } from '@ant-design/icons';
import NewGradeForm from '../NewGradeForm/NewGradeForm';

const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;
// const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// TODO: добавить спинер при загрузке грейдов
// TODO: добавить фильтры и сортировки

export default function GradesEditor() {
	const grades = useGetData(async () => {
		await timeout(1500, false);
		return gradesStub;
	});
	const [selectedGrade, selectGrade] = useState(null);
	const specializations = useGetData(async () => {
		await timeout(1500, false);
		return specStub;
	});
	const [isModalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		specializations.getData();
		grades.getData();
	}, []);

	const onSelectHandler = (specialization) => {
		grades.getData(specialization);
	};

	const handleOk = () => {
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
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
		<div>
			<Divider orientation="left">Грейды</Divider>
			<Button icon={<PlusOutlined />} type="dashed" style={{ margin: '8px 16px' }} onClick={() => setModalVisible(true)}>Создать новый</Button>
			<Collapse ghost>
				{grades.data?.map((item, i) => <Panel header={item.name} key={i}><MarkdownRender mdText={item.description}/></Panel>)}
			</Collapse>
			<Modal className={styles.modal}
			       title="Новый грейд"
			       visible={isModalVisible}
			       onOk={handleOk}
			       onCancel={handleCancel}
			>
				<NewGradeForm/>
			</Modal>
		</div>
	);
}

function traversalGrades(item) {
	if (item.next === null) return [];

	return [item].concat(traversalGrades(item.next));
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