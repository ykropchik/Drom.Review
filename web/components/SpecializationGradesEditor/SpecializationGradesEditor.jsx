import React, { useState } from 'react';
import Hierarchy from '../Hierarchy/Hierarchy';
import { Checkbox, Row } from 'antd';
import styles from './SpecializationGradesEditor.module.scss';

export default function SpecializationGradesEditor({ value, allGrades }) {
	const [selectedValues, setSelectedValues] = useState(value);

	const onChangeHandler = (data) => {
		console.log(data);
		setSelectedValues(allGrades.filter((item) => data.includes(item.id)));
	};

	return (
		<div className={styles.content}>
			<Hierarchy value={selectedValues} dataIndex="name"/>
			<Checkbox.Group value={selectedValues.map((item) => item.id)} onChange={onChangeHandler}>
				{
					value.map((option, i) =>
						<Row key={i}>
							<Checkbox value={option.id}>
								{option.name}
							</Checkbox>
						</Row>
					)
				}
			</Checkbox.Group>
		</div>
	);
}