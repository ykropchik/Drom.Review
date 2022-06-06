import * as React from 'react';
import { Form, Input, Select } from 'antd';
const { Option } = Select;

const suffixSelector = (
	<Form.Item name="suffix" noStyle>
		<Select
			style={{
				width: 'auto',
			}}
		>
			<Option value="drom">@drom.ru</Option>
			<Option value="vl">@vl.ru</Option>
			<Option value="farpost">@farpost.com</Option>
		</Select>
	</Form.Item>
);

export default function MailInput() {
	return (
		<Input placeholder="Почта" addonAfter={suffixSelector}/>
	);
}