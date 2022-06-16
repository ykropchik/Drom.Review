import React, { useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

export default function MailInput({ value, onChange, placeHolder }) {
	const [email, setEmail] = useState(getValue(value));

	const onChangeBody = (e) => {
		let newEmail = {...email, body: e.target.value};
		onChangeHandler(newEmail);
	};

	const onChangeSuffix = (suffix) => {
		let newEmail = {...email, suffix: suffix};
		onChangeHandler(newEmail);
	};

	const onChangeHandler = (newEmail) => {

		setEmail(newEmail);
		onChange(newEmail.body + newEmail.suffix);
	};

	return (
		<Input value={email.body}
		       placeholder={placeHolder}
		       onChange={onChangeBody}
		       addonAfter={<SuffixSelector value={email.suffix}
		                                   onChange={onChangeSuffix}/>}/>
	);
}

const SuffixSelector = ({ value, onChange }) => {
	const [selected, setSelected] = useState(value);

	const onChangeHandler = (val) => {
		onChange(val);
		setSelected(val);
	};

	return (
		<Select
			style={{ minWidth: 130, textAlign: 'left' }}
			value={selected}
			onChange={onChangeHandler}
		>
			<Option value="@drom.ru">@drom.ru</Option>
			<Option value="@vl.ru">@vl.ru</Option>
			<Option value="@farpost.com">@farpost.com</Option>
		</Select>
	);
};

const getValue = (data) => {
	const regexp = new RegExp(/(.*)(@.*)/g);
	const match = regexp.exec(data);
	return {
		body: match[1],
		suffix: match[2]
	};
};
