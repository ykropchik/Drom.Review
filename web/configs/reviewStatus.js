import React from 'react';
import {
	CheckCircleOutlined,
	CommentOutlined, EditOutlined,
	FileDoneOutlined,
	FileTextOutlined,
	SyncOutlined,
} from '@ant-design/icons';

export const reviewStatusInfo = {
	'init': {
		step: 0,
		description: 'инициировал review',
		icon: <FileTextOutlined/>
	},
	'review': {
		step: 1,
		description: 'отправил на проверку',
		icon: <FileDoneOutlined/>
	},
	'correction': {
		step: 1,
		description: 'вернул на исправление',
		icon: <EditOutlined/>
	},
	'opinion_waiting': {
		step: 2,
		description: 'отправил респондентам приглашения',
		icon: <SyncOutlined/>
	},
	'meeting_waiting': {
		step: 3,
		description: 'назначил дату личной встречи',
		icon:  <CommentOutlined/>
	},
	'completed': {
		step: 4,
		description: 'завершил review',
		icon: <CheckCircleOutlined />
	},
};