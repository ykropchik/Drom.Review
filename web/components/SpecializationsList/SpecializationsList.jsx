import * as React from 'react';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import { Button, Collapse, Table } from 'antd';
import Hierarchy from '../Hierarchy/Hierarchy';
import styles from './SpecializationsList.module.scss';
import { useState } from 'react';

const { Panel } = Collapse;

export default function SpecializationsList({ specializations }) {
	const [editableItem, setEditableItem] = useState(null);

	return (
		<Collapse ghost>
			{
				specializations?.map((item, i) =>
					<Panel header={item.name} key={i}>
						<div className={styles.panel_content}>
							<div className={styles.left_side}>
								<Hierarchy items={item.grades} dataIndex="name" defaultSelect={item.grades[0]} editable={editableItem === item}/>
								{
									editableItem === item
										?
										<Button className={styles.edit_button} icon={<SaveOutlined />} onClick={() => setEditableItem(null)} type="primary">Сохранить</Button>
										:
										<Button className={styles.edit_button} icon={<SettingOutlined/>} onClick={() => setEditableItem(item)}>Редактировать</Button>
								}
							</div>
							{editableItem !== item && <MarkdownRender mdText={item.grades[0].description}/>}
						</div>
					</Panel>
				)
			}
		</Collapse>
	);
}