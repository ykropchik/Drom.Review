import React from 'react';
import { Divider, Table } from 'antd';
import MarkdownRender from '../MarkdownRender/MarkdownRender';

export default function OpinionView({ opinion }) {
	console.log(opinion);
	return (
		<>
			<Table dataSource={opinion.opinions} columns={columns} bordered/>
			{
				opinion.comment &&
				<>
					<Divider orientation="left">Комментарий</Divider>
					<MarkdownRender mdText={opinion.comment}/>
				</>
			}
		</>
	);
}

const columns = [
	{
		title: 'Вопрос',
		dataIndex: 'question',
		key: 'question',
		render: (data) => data.text
	},
	{
		title: 'Ответ',
		dataIndex: 'estimate',
		key: 'estimate'
	}
];