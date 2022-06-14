import React from 'react';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import PanelExtraButton from '../PanelExtraButton/PanelExtraButton';

export default function PanelExtra({ onEditClick, onRemoveClick }) {
	return (
		<>
			<PanelExtraButton icon={<SettingOutlined/>} onClick={() => onEditClick()}/>
			<PanelExtraButton icon={<DeleteOutlined />} onClick={() => onRemoveClick()}/>
		</>
	);
}