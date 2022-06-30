import React from 'react';
import {
	CheckCircleOutlined,
	CommentOutlined, EditOutlined, FileAddOutlined,
	FileDoneOutlined,
	FileTextOutlined, MessageOutlined,
	SyncOutlined, UsergroupAddOutlined,
} from '@ant-design/icons';

export const reviewStatusInfo = {
	'init': {
		step: 0,
		title: 'Новый',
		icon: <FileTextOutlined />,
		type: 'default'
	},
	'review': {
		step: 1,
		title: 'Проверка',
		icon: <FileDoneOutlined />,
		type: 'default'
	},
	'correction': {
		step: 0,
		title: 'Редактирование',
		icon: <EditOutlined />,
		type: 'warning'
	},
	'opinion_waiting': {
		step: 2,
		title: 'Ожидание 360 мнений',
		icon: <SyncOutlined />,
		type: 'process'
	},
	'meeting_waiting': {
		step: 3,
		title: 'Ожидание встречи',
		icon: <SyncOutlined />,
		type: 'process'
	},
	'completed': {
		step: 4,
		title: 'Завершено',
		icon: <CheckCircleOutlined />,
		type: 'success'
	},
};

export const reviewHistoryInfo = {
	'init': {
		description: 'инициировал review',
		icon: <FileTextOutlined/>
	},
	'set_review_status': {
		description: 'отправил на проверку',
		icon: <FileDoneOutlined/>
	},
	'set_correction_status': {
		description: 'вернул на исправление',
		icon: <EditOutlined/>
	},
	'set_opinion_waiting_status': {
		description: 'отправил респондентам приглашения',
		icon: <SyncOutlined/>
	},
	'set_meeting_waiting_status': {
		description: 'назначил дату личной встречи',
		icon:  <CommentOutlined/>
	},
	'set_completed_status': {
		description: 'завершил review',
		icon: <CheckCircleOutlined />
	},
	'add_self_review': {
		description: 'добавил self-review',
		icon: <FileAddOutlined />
	},
	'add_respondents_list': {
		description: 'добавил список респондентов',
		icon: <UsergroupAddOutlined />
	},
	'edit_self_review': {
		description: 'отредактировал self-review',
		icon: <EditOutlined/>
	},
	'edit_respondents_list': {
		description: 'отредактировал список респондентов',
		icon: <EditOutlined/>
	},
	'add_comment': {
		description: 'добавил комментарий',
		icon: <MessageOutlined />
	}
};