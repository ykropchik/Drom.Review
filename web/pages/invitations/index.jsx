import React from 'react';
import { Button, Collapse, Divider, List } from 'antd';
import { Users } from '../../stubs/users';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import Tag from '../../components/Tag/Tag';
import Link from 'next/link';
import styles from '../../public/styles/pages/Invitations.module.scss';

export default function Invitations() {
	return (
		<Collapse ghost>
			<Collapse.Panel key="waiting_decision" header={<Divider style={{ margin: 0 }} orientation="left">Ожидают решения</Divider>}>
				<List dataSource={Users} renderItem={(user) => (
					<Link href={'/opinion/1'}>
						<List.Item className={styles.list_item} actions={[<Button key={'accept-btn'}>Принять</Button>, <Button key={'decline-btn'} type="primary">Отказаться</Button>]}>
							<List.Item.Meta avatar={<UserAvatar avatarUrl={user.avatarUrl} userName={user.name} size={32}/>}
							                title={user.name} description={`${user.qualifications[0]?.specialization} - ${user.qualifications[0]?.grade}`}/>
						</List.Item>
					</Link>
				)}/>
			</Collapse.Panel>
			<Collapse.Panel key="waiting_opinion" header={<Divider style={{ margin: 0 }} orientation="left">Ожидают 360-мнения</Divider>}>
				<List dataSource={Users} renderItem={(user) => (
					<Link href={'/opinion/1'}>
						<List.Item className={styles.list_item}>
							<List.Item.Meta avatar={<UserAvatar avatarUrl={user.avatarUrl} userName={user.name} size={32}/>}
							                title={user.name} description={`${user.qualifications[0]?.specialization} - ${user.qualifications[0]?.grade}`}/>
						</List.Item>
					</Link>
				)}/>
			</Collapse.Panel>
			<Collapse.Panel key="completed" header={<Divider style={{ margin: 0 }} orientation="left">Завершенные</Divider>}>
				<List dataSource={Users} renderItem={(user) => (
					<Link href={'/opinion/1'}>
						<List.Item className={styles.list_item}>
							<List.Item.Meta avatar={<UserAvatar avatarUrl={user.avatarUrl} userName={user.name} size={32}/>}
							                title={user.name} description={`${user.qualifications[0]?.specialization} - ${user.qualifications[0]?.grade}`}/>
							<span>{Math.floor(Math.random() * 3) === 2 ? <Tag type="error">Отказ</Tag> : <Tag type="success">Принято</Tag>}</span>
						</List.Item>
					</Link>
				)}/>
			</Collapse.Panel>
		</Collapse>
	);
}