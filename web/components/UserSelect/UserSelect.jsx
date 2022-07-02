import React from 'react';
import { AutoComplete } from 'antd';

export default function UserSelect({ isLoading, data, onChange, onSelect, placeholder, disabled = false }) {
	const onSelectHandler = (user) => {
		onChange?.(user.id);
		onSelect?.(user);
	};

	return (
		<AutoComplete placeholder={placeholder}
			options={data}
			loading={isLoading}
			disabled={disabled}
			allowClear
			filterOption={(inputValue, option) =>
				option?.fullName.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
			}
			onClear={() => onSelect(null)}
			onSelect={(_, user) => onSelectHandler(user)}
			fieldNames={{ label: 'fullName', value: 'fullName' }}/>
	);
}