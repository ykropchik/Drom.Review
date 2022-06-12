import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Select, Skeleton, Tabs } from 'antd';
import useGetData from '../../../scripts/hooks/useGetData';
import timeout from '../../../scripts/timeout';
import { specializations as specStub } from '../../../stubs/specializations';
import styles from '../../../public/styles/pages/SpecEditor.module.scss';
import SpecializationsList from '../../../components/SpecializationsList/SpecializationsList';

export default function SpecEditor() {
	const specializations = useGetData(async () => {
		await timeout(1500);
		return specStub;
	});

	useEffect(() => {
		specializations.getData();
	}, []);

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
						<SpecializationsList specializations={specializations.data}/>
					</>
			}
		</div>
	);
		
	// {/*<Tabs className={styles.content}>*/}
	// {/*	<TabPane tab={<TabPaneItem title="Список" icon={<TableOutlined />}/>} key="table">*/}
	//
	// {/*	</TabPane>*/}
	// {/*	/!*TODO вынести представление с иерархией в раздел "Редактор специализаций"*!/*/}
	// {/*	<TabPane tab={<TabPaneItem title="Иерархия" icon={<ApartmentOutlined />}/>} key="hierarchy">*/}
	// {/*		<Select className={styles.spec_select}*/}
	// {/*		        placeholder="Выберите специализацию"*/}
	// {/*		        loading={specializations.isLoading}*/}
	// {/*		        onSelect={onSelectHandler}>*/}
	// {/*			{specializations.data && specializations.data.map((item, i) => <Option value={item} key={i}>{item}</Option>)}*/}
	// {/*		</Select>*/}
	// {/*		<div className={styles.hierarchy_view}>*/}
	// {/*			{*/}
	// {/*				grades.data &&*/}
	// {/*				<Hierarchy items={grades.data}*/}
	// {/*				           dataIndex="name"*/}
	// {/*				           onItemClick={selectGrade}*/}
	// {/*				           defaultSelect={grades.data[0]}/>*/}
	// {/*			}*/}
	// {/*			{*/}
	// {/*				selectedGrade &&*/}
	// {/*				<MarkdownRender className={styles.description_view} mdText={`# ${selectedGrade.name}\n ${selectedGrade.description}`}/>*/}
	// {/*			}*/}
	// {/*		</div>*/}
	// {/*	</TabPane>*/}
	// {/*	<TabPane tab={<TabPaneItem title="Создать новый" icon={<PlusOutlined />}/>} key="newGrade">*/}
	// {/*		/!*<NewGradeForm/>*!/*/}
	// {/*	</TabPane>*/}
	// {/*</Tabs>*/}
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