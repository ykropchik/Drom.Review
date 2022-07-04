import React from 'react';
import { Divider, PageHeader, Spin } from 'antd';
import { useRouter } from 'next/router';
import styles from '../../public/styles/pages/Opinion.module.scss';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import OpinionForm from '../../components/OpinionForm/OpinionForm';

/** TODO: сдалеать разный вид для preview вопросов и для просмотра уже отправленного 360 */
export default function Opinion() {
	const router = useRouter();
	const { id } = router.query;
	const [isCreating, setIsCreating] = React.useState(false);
	const { data: opinion, isLoading } = useData(() => {
		if (!id) {
			return false;
		}

		return EndPoints.RESPONDENTS + `/${id}`;
	});

	return (
		<Spin spinning={isCreating}>
			<PageHeader title="360-мнение"
			            onBack={() => router.push('/invitations')}>
				{
					isLoading ?
						<span>Loading...</span>
						:
						<>
							<div className={styles.subject_container}>
								<UserAvatar avatarUrl={opinion.review.subject.avatarUrl} userName={opinion.review.subject.fullName} size={64}/>
								<div className={styles.subject_info}>
									<span className={styles.subject_name}>{opinion.review.subject.fullName}</span>
									<span className={styles.subject_qualification}>{`${opinion.review.specialization.name} - ${opinion.review.grade.name}`}</span>
								</div>
							</div>
							<div>
								<Divider/>
								<OpinionForm opinionId={id} questions={opinion.opinions} onSubmit={() => setIsCreating(true)}/>
							</div>
						</>
				}
			</PageHeader>
		</Spin>
	);
}