import React from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';

export default function RespondentStatusTag({ status }) {
	switch (status) {
		case 'inactive':
			return <Tag icon={<EyeOutlined />} color="default">Проверяется</Tag>;
		case 'waiting':
			return <Tag icon={<ClockCircleOutlined />} color="process">Приглашен</Tag>;
		case 'accept':
			return <Tag icon={<CheckCircleOutlined />} color="success">Принял</Tag>;
		case 'decline':
			return <Tag icon={<CloseCircleOutlined />} color="error">Отклонил</Tag>;
		default:
			return;
	}
}