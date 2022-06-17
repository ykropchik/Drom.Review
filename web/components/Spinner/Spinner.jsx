import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export default function Spinner({ size = 16 }) {
	return (
		<LoadingOutlined style={{ fontSize: size }} spin/>
	);
}