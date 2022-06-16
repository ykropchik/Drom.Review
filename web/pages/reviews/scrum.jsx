import React from 'react';
import { Table, Tabs } from 'antd';
import TabPaneItem from '../../components/TabPaneItem/TabPaneItem';
import {
	CheckCircleOutlined, ClockCircleOutlined,
	FileAddOutlined, FileSearchOutlined,
	OrderedListOutlined, SyncOutlined,
} from '@ant-design/icons';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import { reviews } from '../../stubs/reviews';
import Tag from '../../components/Tag/Tag';
import NewReviewForm from '../../components/NewReviewForm/NewReviewForm';

const { TabPane } = Tabs;

export default function Reviews() {
	return (
		<Tabs defaultActiveKey="list">
			<TabPane key="list"
			         tab={<TabPaneItem icon={<OrderedListOutlined/>} title="Список review"/>}
			>
				<Table dataSource={reviews} columns={columns}/>
			</TabPane>
			<TabPane key="newUsers"
			         tab={<TabPaneItem icon={<FileAddOutlined/>} title="Создать"/>}
			>
				<NewReviewForm/>
			</TabPane>
		</Tabs>
	);
}

const columns = [
	{
		title: '',
		dataIndex: 'object',
		key: 'avatarUrl',
		width: 26,
		render: (data) =>
			data.avatar ? <UserAvatar avatarUrl={data} size={26}/> : <UserAvatar avatarPlaceholder={getAvatarPlaceholder(data.name)} size={26}/>,
	},
	{
		title: 'Имя',
		dataIndex: 'object',
		key: 'name',
		sorter: (a, b) => a.name > b.name ? 1 : -1,
		render: (data) => data.name
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
		title: 'Статус',
		dataIndex: 'status',
		key: 'status',
		render: (data) => {
			switch (data.slice(-1)[0].status) {
				case 'waiting':
					return <Tag icon={<ClockCircleOutlined/>} type="default">Ожидание</Tag>;
				case 'checking':
					return <Tag icon={<FileSearchOutlined/>} type="process">Проверка</Tag>;
				case 'fixing':
					return <Tag icon={<SyncOutlined/>} type="warning">Исправление</Tag>;
				case 'completed':
					return <Tag icon={<CheckCircleOutlined/>} type="success">Завершен</Tag>;
			}
		}
	}
];