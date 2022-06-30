import React from 'react';
import { Table, Tabs, Tag } from 'antd';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { OrderedListOutlined, UserAddOutlined } from '@ant-design/icons';
import NewUserForm from '../../components/NewUserForm/NewUserForm';
import TabPaneItem from '../../components/TabPaneItem/TabPaneItem';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import { useRouter } from 'next/router';

const { TabPane } = Tabs;

export default function Users() {
	const users = useData(EndPoints.USERS);
	const grades = useData(EndPoints.GRADES);
	const specializations = useData(EndPoints.SPECIALIZATIONS);
	const router = useRouter();

	const prepareColumns = (data) => {
		let preparedColumns = data.slice();
		preparedColumns[2].filters = specializations.data?.map((specialization) => ({ text: specialization.name, value: specialization.name }));
		preparedColumns[3].filters = grades.data?.map((grade) => ({ text: grade.name, value: grade.name }));

		return preparedColumns;
	};

	return (
		<Tabs defaultActiveKey="list">
			<TabPane key="list"
			         tab={<TabPaneItem icon={<OrderedListOutlined/>} title="Список сотрудников"/>}
			>
				<Table dataSource={users.data}
				       columns={prepareColumns(columns)}
				       onRow={(record) => ({ style: {cursor: 'pointer'}, onClick: () => router.push(`/users/${record.id}`)})}/>
			</TabPane>
			<TabPane key="newUsers"
			         tab={<TabPaneItem icon={<UserAddOutlined/>} title="Создать"/>}
			>
				<NewUserForm/>
			</TabPane>
		</Tabs>
	);
}

const columns = [
	{
		title: '',
		dataIndex: 'avatarUrl',
		key: 'avatarUrl',
		width: 26,
		render: (data, record) => <UserAvatar avatarUrl={data} userName={record.name} size={26}/>
	},
	{
		title: 'Имя',
		dataIndex: 'fullName',
		key: 'fullName',
		sorter: (a, b) => a.name > b.name ? 1 : -1,
	},
	{
		title: 'Специализация',
		dataIndex: 'qualifications',
		key: 'specialization',
		render: (data) => data.at(-1)?.specialization.name,
		sorter: (a, b) => a.specialization > b.qualification.specialization ? 1 : -1,
		onFilter: (value, record) => record.qualification.specialization.indexOf(value) === 0
	},
	{
		title: 'Грейд',
		dataIndex: 'qualifications',
		key: 'grade',
		render: (data) => data.at(-1)?.grade.name,
		sorter: (a, b) => a.grade > b.grade ? 1 : -1,
		onFilter: (value, record) => record.qualification.grade.indexOf(value) === 0
	},
	{
		title: 'Роль',
		dataIndex: 'roles',
		key: 'roles',
		sorter: (a, b) => a.role > b.role ? 1 : -1,
		render: (data) => {
			if (data.includes('ROLE_SCRUM')) {
				return <Tag color="red">Скрам</Tag>;
			}

			if (data.includes('ROLE_LEADER')) {
				return <Tag color="green">Техлид</Tag>;
			}

			return <Tag color="geekblue">Обычный пользователь</Tag>;
		}
	}
];