import * as React from 'react';
import { Tabs } from 'antd';
import TabPaneItem from '../../components/TabPaneItem/TabPaneItem';
import GradesEditor from '../../components/GradeEditor/GradesEditor';

const { TabPane } = Tabs;

export default function Editor() {
	return (
		<GradesEditor/>
		// <Tabs>
		// 	<TabPane tab={<TabPaneItem title="Грейды"/>} key="grades">
		//
		// 	</TabPane>
		// 	<TabPane tab={<TabPaneItem title="Специализации"/>} key="specializations">
		//
		// 	</TabPane>
		// </Tabs>
	);
}