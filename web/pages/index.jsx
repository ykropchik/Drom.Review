import React, { useContext } from 'react';
import { Divider, Collapse } from 'antd';
import ReviewBrief from '../components/ReviewBrief/ReviewBrief';
import { reviews } from '../stubs/reviews';
import styles from '../public/styles/pages/Reviews.module.scss';
import { UserRoleContext } from './_app';
import { useRouter } from 'next/router';

const { Panel } = Collapse;

export default function Reviews() {
	const router = useRouter();
	const userRole = useContext(UserRoleContext);

	if (userRole === 'scrum') {
		router.push('/reviews');
	}

	return (
		<Collapse defaultActiveKey={['activeReviews']} ghost>
			<Panel header={<Divider style={{ margin: 0 }} orientation="left">Активные review</Divider>} key="activeReviews">
				<div className={styles.panel_content}>
					{
						reviews.filter((review) => review.currentStatus !== 'completed').map((review, i) => <ReviewBrief review={review} key={i} selfBrief={userRole === 'default'}/>)
					}
				</div>
			</Panel>
			<Panel header={<Divider style={{ margin: 0 }} orientation="left">Закрытые review</Divider>} key="closedReviews">
				<div className={styles.panel_content}>
					{
						reviews.filter((review) => review.currentStatus === 'completed').map((review, i) => <ReviewBrief review={review} key={i} selfBrief={userRole === 'default'}/>)
					}
				</div>
			</Panel>
		</Collapse>
	);
}