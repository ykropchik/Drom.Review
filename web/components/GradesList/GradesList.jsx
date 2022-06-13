import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import { Collapse } from 'antd';
import styles from './GradesList.module.scss';

const { Panel } = Collapse;

export default function GradesList({ grades }) {
	const [activePanels, setActivePanels] = useState([]);
	const [editablePanel, setEditablePanel] = useState(null);

	console.log(editablePanel);

	return (
		<Collapse activeKey={activePanels} onChange={setActivePanels} ghost>
			{
				grades?.map((item, i) =>
					<Panel header={item.name}
					       key={i}
					       extra={<EditButton activePanels={activePanels} clickedPanel={i.toString()} onClick={setEditablePanel}/>}>
						<MarkdownRender mdText={item.description}/>
					</Panel>
				)
			}
		</Collapse>
	);
}

function EditButton({ activePanels, clickedPanel, onClick }) {
	return (
		<SettingOutlined className={styles.edit_button} onClick={(event) => {
			console.log(activePanels, clickedPanel);
			if (activePanels.includes(clickedPanel)) {
				event.stopPropagation();
			}

			onClick(clickedPanel);
		}}/>
	);
}