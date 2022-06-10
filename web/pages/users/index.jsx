import React from 'react';
import { Table, Tabs, Tag } from 'antd';
import { Users as UsersStub } from '../../stubs/users';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import { OrderedListOutlined, UserAddOutlined } from '@ant-design/icons';
import NewUserForm from '../../components/NewUserForm/NewUserForm';
import TabPaneItem from '../../components/TabPaneItem/TabPaneItem';

const { TabPane } = Tabs;

export default function Users() {
	return (
		<Tabs defaultActiveKey="list">
			<TabPane key="list"
			         tab={<TabPaneItem icon={<OrderedListOutlined/>} title="Список сотрудников"/>}
			>
				<Table dataSource={UsersStub} columns={columns} locale={i18n}/>
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
		render: (data, record) =>
			data ? <UserAvatar avatarUrl={data} size={26}/> : <UserAvatar avatarPlaceholder={getAvatarPlaceholder(record.name)} size={26}/>,
	},
	{
		title: 'Имя',
		dataIndex: 'name',
		key: 'name',
		sorter: (a, b) => a.name > b.name ? 1 : -1,
	},
	{
		title: 'Специализация',
		dataIndex: 'specialization',
		key: 'specialization',
		filters: [
			{
				text:  'Frontend',
				value: 'Frontend'
			},
			{
				text: 'Backend',
				value: 'Backend'
			},
			{
				text: 'IOS',
				value: 'IOS'
			},
			{
				text: 'Android',
				value: 'Android'
			},
			{
				text: 'DevOps',
				value: 'DevOps'
			},
			{
				text: 'Java',
				value: 'Java'
			}
		],
		sorter: (a, b) => a.specialization > b.specialization ? 1 : -1,
		onFilter: (value, record) => record.specialization.indexOf(value) === 0
	},
	{
		title: 'Грейд',
		dataIndex: 'grade',
		key: 'grade',
		filters: [
			{
				text:  'Junior',
				value: 'Junior'
			},
			{
				text: 'Middle',
				value: 'Middle'
			},
			{
				text: 'Senior',
				value: 'Senior'
			},
		],
		sorter: (a, b) => a.grade > b.grade ? 1 : -1,
		onFilter: (value, record) => record.grade.indexOf(value) === 0
	},
	{
		title: 'Роль',
		dataIndex: 'role',
		key: 'role',
		sorter: (a, b) => a.role > b.role ? 1 : -1,
		render: (data) => {
			switch (data) {
				case 'Lead':
					return <Tag color="green">Техлид</Tag>;
				case 'Scrum':
					return <Tag color="red">Скрам</Tag>;
				case 'Default':
					return <Tag color="geekblue">Обычный пользователь</Tag>;
			}
		}
	}
];

const i18n = {
	filterTitle: 'Меню фильтров',
	filterConfirm: 'OK',
	filterReset: 'Сброс',
	filterEmptyText: 'Нет фильтров',
	filterCheckall: 'Выбрать всё',
	filterSearchPlaceholder: 'Искать фильтр',
	emptyText: 'Нет данных',
	selectAll: 'Выбрать текущую страницу',
	selectInvert: 'Инвертировать текущую страницу',
	selectNone: 'Убрать выделение',
	selectionAll: 'Выбрать всё',
	sortTitle: 'Сортировать',
	expand: 'Показать полностью',
	collapse: 'Скрыть подробности',
	triggerDesc: 'Нажмите для сортировки по убыванию',
	triggerAsc: 'Нажмите для сортировки по возрастанию',
	cancelSort: 'Нажмите для отмены сортировки',
};