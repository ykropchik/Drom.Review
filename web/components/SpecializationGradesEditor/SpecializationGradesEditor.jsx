import React, { useState } from 'react';
import Hierarchy from '../Hierarchy/Hierarchy';
import { Checkbox, Row, Spin } from 'antd';
import styles from './SpecializationGradesEditor.module.scss';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';

export default function SpecializationGradesEditor({ value, onChange }) {
	const grades = useData(EndPoints.GRADES);
	const [selectedValues, setSelectedValues] = useState(value || []);

	const onItemsChangeHandler = (data) => {
		let newValues = grades.list.filter((item) => data.includes(item.id));
		setSelectedValues(newValues);
		onChange(newValues.map((item) => item.id));
	};

	const onOrderChangeHandler = (data) => {
		onChange(data.map((item) => item.id));
	};

	return (
		<div className={styles.content}>
			<Hierarchy value={selectedValues} dataIndex="name" onChange={onOrderChangeHandler} sortable/>
			{
				grades.isLoading ?
					<Spin/>
					:
					<Checkbox.Group value={selectedValues.map((item) => item.id)} onChange={onItemsChangeHandler}>
						{
							grades.list.map((option, i) =>
								<Row key={i}>
									<Checkbox value={option.id}>
										{option.name}
									</Checkbox>
								</Row>
							)
						}
					</Checkbox.Group>
			}
		</div>
	);
}