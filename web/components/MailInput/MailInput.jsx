import React from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

export default function MailInput({ placeHolder }) {
	return (
		<Input placeholder={placeHolder} addonAfter={suffixSelector}/>
	);
}

const suffixSelector = (
	<Form.Item name="suffix" noStyle>
		<Select
			style={{ minWidth: 130, textAlign: 'left' }}
		>
			<Option value="drom">@drom.ru</Option>
			<Option value="vl">@vl.ru</Option>
			<Option value="farpost">@farpost.com</Option>
		</Select>
	</Form.Item>
);
