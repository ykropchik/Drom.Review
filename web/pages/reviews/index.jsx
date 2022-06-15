import React from 'react';
import { Divider, Collapse } from 'antd';
import ReviewBrief from '../../components/ReviewBrief/ReviewBrief';
import { reviews } from '../../stubs/reviews';
import styles from '../../public/styles/pages/Reviews.module.scss';

const { Panel } = Collapse;

export default function Reviews() {
	return (
		<Collapse defaultActiveKey={['activeReviews']} ghost>
			<Panel header={<Divider style={{ margin: 0 }} orientation="left">Активные review</Divider>} key="activeReviews">
				<div className={styles.panel_content}>
					{
						reviews.map((review, i) => <ReviewBrief review={review} key={i} selfBrief={true}/>)
					}
				</div>
			</Panel>
			<Panel header={<Divider style={{ margin: 0 }} orientation="left">Закрытые review</Divider>} key="closedReviews">

			</Panel>
		</Collapse>
	);
}