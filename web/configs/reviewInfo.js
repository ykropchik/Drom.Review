import React from 'react';
import {
	CheckCircleOutlined,
	CommentOutlined, EditOutlined, FileAddOutlined,
	FileDoneOutlined,
	FileTextOutlined, MessageOutlined,
	SyncOutlined, UsergroupAddOutlined,
} from '@ant-design/icons';

export const reviewStatusStep = {
	'init': 0,
	'review': 1,
	'correction': 0,
	'opinion_waiting': 2,
	'meeting_waiting': 3,
	'completed': 4,
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