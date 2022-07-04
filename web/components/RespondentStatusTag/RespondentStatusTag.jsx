import React from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';

export default function RespondentStatusTag({ status }) {
	switch (status) {
		case 'inactive':
			return <Tag icon={<EyeOutlined />} color="default">Проверяется</Tag>;
		case 'waiting':
			return <Tag icon={<ClockCircleOutlined />} color="process">Приглашен</Tag>;
		case 'accepted':
			return <Tag icon={<CheckCircleOutlined />} color="success">Принял</Tag>;
		case 'completed':
			return <Tag icon={<CheckCircleOutlined />} color="success">Ответил</Tag>;
		case 'declined':
			return <Tag icon={<CloseCircleOutlined />} color="error">Отклонил</Tag>;
		default:
			return null;
	}
}