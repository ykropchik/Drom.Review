import React from 'react';
import { Select } from 'antd';

export default function QualificationSelect({ disabled, data, onChange }) {
	const onSelectHandler = (label, {item}) => {
		onChange?.({
			grade: item.grade.id,
			specialization: item.specialization.id,
		});
	};

	return (
		<Select optionLabelProp="label"
		        disabled={disabled}
		        placeholder="Выберите квалификацию сотрудника"
		        onSelect={onSelectHandler}>
			{
				data?.map((item, i) =>
					<Select.Option title={`${item.specialization.name} - ${item.grade.name}`}
					        value={`${item.specialization.name} - ${item.grade.name}`}
					        item={item}
					        key={i}>
						{`${item.specialization.name} - ${item.grade.name}`}
					</Select.Option>
				)
			}
		</Select>
	);
}