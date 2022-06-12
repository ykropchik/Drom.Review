import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function GradesList({ grades }) {
	return (
		<Collapse ghost>
			{
				grades?.map((item, i) =>
					<Panel header={item.name} key={i} extra={<SettingOutlined
						onClick={() => {

						}}
					/>}>
						<MarkdownRender mdText={item.description}/>
					</Panel>
				)
			}
		</Collapse>
	);
}