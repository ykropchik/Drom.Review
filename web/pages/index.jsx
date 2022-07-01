import React, { useContext } from 'react';
import { Divider, Collapse, Empty } from 'antd';
import ReviewBrief from '../components/ReviewBrief/ReviewBrief';
import styles from '../public/styles/pages/Reviews.module.scss';
import { UserRoleContext } from './_app';
import { useRouter } from 'next/router';
import useData from '../scripts/hooks/useData';
import { EndPoints } from '../scripts/api/EndPoints';

const { Panel } = Collapse;

export default function Reviews() {
	const reviews = useData(EndPoints.REVIEWS + '?type=self');
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
						reviews.data?.filter((review) => review.currentStatus !== 'completed').map((review, i) => <ReviewBrief review={review} key={i} selfBrief={userRole === 'default'}/>)
					}
					{
						!reviews.data ??
							<Empty/>
					}
				</div>
			</Panel>
			<Panel header={<Divider style={{ margin: 0 }} orientation="left">Закрытые review</Divider>} key="closedReviews">
				<div className={styles.panel_content}>
					{
						reviews.data?.filter((review) => review.currentStatus === 'completed').map((review, i) => <ReviewBrief review={review} key={i} selfBrief={userRole === 'default'}/>)
					}
				</div>
			</Panel>
		</Collapse>
	);
}