import React, { useState } from 'react';
import Hierarchy from '../Hierarchy/Hierarchy';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import styles from './SpecializationGradesView.module.scss';
import { Empty } from 'antd';

export default function SpecializationGradesView({ specialization, defaultSelect }) {
	const [selectedItem, setSelectedItem] = useState(defaultSelect);

	return (
		<>
			{
				specialization.grades.length === 0 ?
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
					:
					<div className={styles.content}>
						<div className={styles.left_side}>
							<Hierarchy value={specialization.grades} dataIndex="name" defaultSelect={selectedItem} onItemClick={setSelectedItem}/>
						</div>
						<MarkdownRender className={styles.grade_description} mdText={selectedItem?.description}/>
					</div>
			}
		</>
	);
}