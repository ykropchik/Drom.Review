import React from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default function RespondentStatusTag({ status }) {
	switch (status) {
		case 'waiting':
			return <Tag icon={<ClockCircleOutlined />} color="default">Ожидание</Tag>;
		case 'accept':
			return <Tag icon={<CheckCircleOutlined />} color="success">Принял</Tag>;
		case 'decline':
			return <Tag icon={<CloseCircleOutlined />} color="error">Отклонил</Tag>;
		default:
			return;
	}
}