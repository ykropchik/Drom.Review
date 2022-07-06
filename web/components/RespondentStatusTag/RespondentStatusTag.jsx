import React from 'react';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import Tag from '../../components/Tag/Tag';

export default function RespondentStatusTag({ status }) {
	switch (status) {
		case 'inactive':
			return <Tag icon={<EyeOutlined />} type="default">Проверяется</Tag>;
		case 'waiting':
			return <Tag icon={<ClockCircleOutlined />} type="process">Приглашен</Tag>;
		case 'accepted':
			return <Tag icon={<CheckCircleOutlined />} type="success">Принял</Tag>;
		case 'completed':
			return <Tag icon={<CheckCircleOutlined />} type="success">Ответил</Tag>;
		case 'declined':
			return <Tag icon={<CloseCircleOutlined />} type="error">Отклонил</Tag>;
		default:
			return null;
	}
}