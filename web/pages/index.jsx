import React from 'react';
import { Divider, Collapse, Empty } from 'antd';
import ReviewBrief from '../components/ReviewBrief/ReviewBrief';
import styles from '../public/styles/pages/Reviews.module.scss';
import useData from '../scripts/hooks/useData';
import { EndPoints } from '../scripts/api/EndPoints';
import { useSession } from '../scripts/SessionProvider';

const { Panel } = Collapse;

export default function Reviews() {
	const { role } = useSession();
	const reviews = useData(() => {
		if (!role) {
			return false;
		}

		return EndPoints.REVIEWS + `?type=${role === 'ROLE_LEADER' ? 'lead' : 'self'}`;
	});

	return (
		<Collapse defaultActiveKey={['activeReviews']} ghost>
			<Panel header={<Divider style={{ margin: 0 }} orientation="left">Активные review</Divider>} key="activeReviews">
				<div className={styles.panel_content}>
					{
						reviews.data?.filter(
							(review) => review.currentStatus !== 'completed').map((review, i) =>
							<ReviewBrief review={review} key={i} selfBrief={role !== 'ROLE_LEADER'}/>
						)
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
						reviews.data?.filter(
							(review) => review.currentStatus === 'completed').map((review, i) =>
							<ReviewBrief review={review} key={i} selfBrief={role !== 'ROLE_LEADER'}/>
						)
					}
				</div>
			</Panel>
		</Collapse>
	);
}