import React from 'react';
import { PageHeader, Spin, Table } from 'antd';
import { useRouter } from 'next/router';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import styles from '../../public/styles/pages/UserInfo.module.scss';

export default function UserInfo() {
	const router = useRouter();
	const { id } = router.query;
	const user = useData(EndPoints.USER + `/${id}`, router.query.id);

	if (!id) {
		return null;
	}

	return (
		<PageHeader title={user.data?.fullName}
		            avatar={{ children: getAvatarPlaceholder(user.data?.fullName), style: { backgroundColor: '#DB011A' } }}
		            onBack={() => router.back()}>
			{
				user.isLoading
					?
					<Spin/>
					:
					<div className={styles.user_info}>
						<div className={styles.info_item}>
							<h2>Email:</h2>
							<span>{user.data?.email}</span>
						</div>
						<div className={styles.info_item}>
							<h2>Роль:</h2>
							<span>{user.data?.roles}</span>
						</div>
						<div className={styles.info_item}>
							<h2>Квалификации:</h2>
							<Table dataSource={user.data?.qualifications.reverse()} columns={columns} pagination={false}/>
						</div>
					</div>
			}
		</PageHeader>
	);
}

const columns = [
	{
		title: 'Специализация',
		dataIndex: 'specialization',
		key: 'specialization',
		render: (data) => data.name,
	},
	{
		title: 'Грейд',
		dataIndex: 'grade',
		key: 'grade',
		render: (data) => data.name
	}
];
