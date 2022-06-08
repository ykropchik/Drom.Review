import * as React from 'react';
import styles from '../../public/styles/pages/Personal.module.scss';
import { Col, Divider, Form, Input, Row, Skeleton as AntSkeleton } from 'antd';
import { useEffect, useState } from 'react';
import timeout from '../../scripts/timeout';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import { Users } from '../../stubs/users';

export default function Personal() {
	const [userInfo, setUserInfo] = useState({});
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		timeout(2000, false)
			.then(() => setUserInfo(Users[0]))
			.finally(() => setLoading(false));
	});

	return (
		<div className={styles.content}>
			{
				isLoading
					? <Skeleton/>
					: <PersonalInfo userInfo={userInfo}/>
			}
		</div>
	);
}

function PersonalInfo({ userInfo }) {
	return(
		<Row gutter={[24, 0]} style={{ width: '100%', justifyContent: 'center' }}>
			<Col flex="0 0 auto" className={styles.left_side}>
				{
					userInfo.avatarUrl
						? <UserAvatar className={styles.avatar} src={userInfo.avatarUrl} editable/>
						: <UserAvatar className={styles.avatar} size={180} avatarPlaceholder={getAvatarPlaceholder(userInfo.name)} editable/>
				}
			</Col>
			<Col flex={0.5} className={styles.right_side}>
				<Divider>Личная информация</Divider>
				<Form
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					className={styles.form}
					initialValues={userInfo}>
					<Form.Item
						label="ФИО"
						name="name">
						<Input/>
					</Form.Item>
					<Form.Item
						label="Почта"
						name="email">
						<Input/>
					</Form.Item>
					<Form.Item
						label="Специализация"
						name="specialization">
						<Input/>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
}

function Skeleton() {
	return (
		<Row gutter={[24, 0]} style={{ width: '100%', justifyContent: 'center' }}>
			<Col flex="0 0 auto" className={styles.left_side}>
				<AntSkeleton.Avatar size={180} active/>
			</Col>
			<Col flex={0.5} className={styles.right_side}>
				<AntSkeleton paragraph={{ rows: 4 }} active/>
				<AntSkeleton paragraph={{ rows: 4 }} active/>
			</Col>
		</Row>
	);
}