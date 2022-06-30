import React from 'react';
import { Table, Tabs } from 'antd';
import TabPaneItem from '../../components/TabPaneItem/TabPaneItem';
import { FileAddOutlined, OrderedListOutlined } from '@ant-design/icons';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import Tag from '../../components/Tag/Tag';
import NewReviewForm from '../../components/NewReviewForm/NewReviewForm';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import { reviewStatusInfo } from '../../configs/reviewInfo';
import dateFormatter from '../../scripts/dateFormatter';

const { TabPane } = Tabs;

export default function Reviews() {
	const reviews = useData(EndPoints.REVIEWS);

	return (
		<Tabs defaultActiveKey="list">
			<TabPane key="list"
			         tab={<TabPaneItem icon={<OrderedListOutlined/>} title="Список review"/>}
			>
				<Table dataSource={reviews.data} loading={reviews.isLoading} columns={columns}/>
			</TabPane>
			<TabPane key="newUsers"
			         tab={<TabPaneItem icon={<FileAddOutlined/>} title="Создать"/>}
			>
				<NewReviewForm onCreate={reviews.update}/>
			</TabPane>
		</Tabs>
	);
}

const statusFilters = () => {
	let result = [];
	for (let [key, value] of Object.entries(reviewStatusInfo)) {
		result.push({ text: value.title, value: key });
	}
	return result;
};

const columns = [
	{
		title: '',
		dataIndex: 'subject',
		key: 'avatarUrl',
		width: 26,
		render: (data) => <UserAvatar avatarUrl={data.avatarUrl} userName={data.name} size={26}/>
	},
	{
		title: 'Имя',
		dataIndex: 'subject',
		key: 'subject',
		sorter: (a, b) => a.fullName > b.fullName ? 1 : -1,
		render: (data) => data.fullName
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
		sorter: (a, b) => a.specialization.name > b.specialization.name ? 1 : -1,
		onFilter: (value, record) => record.specialization.name.toLowerCase().indexOf(value) === 0,
		render: (data) => data.name
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
		sorter: (a, b) => a.grade.name > b.grade.name ? 1 : -1,
		onFilter: (value, record) => record.grade.name.toLowerCase().indexOf(value) === 0,
		render: (data) => data.name
	},
	{
		title: 'Дата начала',
		dataIndex: 'dateStart',
		key: 'dateStart',
		sorter: (a, b) => a > b ? 1 : -1,
		render: (data) => dateFormatter(data)
	},
	{
		title: 'Статус',
		dataIndex: 'status',
		key: 'status',
		filters: statusFilters(),
		onFilter: (value, record) => record.status.indexOf(value) === 0,
		render: (data) => {
			const statusData = reviewStatusInfo[data];
			return <Tag icon={statusData.icon} type={statusData.type}>{statusData.title}</Tag>;
		}
	}
];