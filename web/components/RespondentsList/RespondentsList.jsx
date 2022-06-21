import React from 'react';
import { List, Divider } from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import Link from 'next/link';
import RespondentStatusTag from '../RespondentStatusTag/RespondentStatusTag';

export default function RespondentsList({ list }) {
	return (
		<List itemLayout="horizontal"
		      dataSource={list || []} renderItem={(item) => <RespondentsList.Item data={item}/>}>
		</List>
	);
}

RespondentsList.Item = ({ data }) => {
	return (
		<List.Item>
			<List.Item.Meta
				avatar={<UserAvatar avatarUrl={data.avatarUrl} user={data.name} size={32}/>}
				title={
					<>
						<Link href={`/user/${data.id}`}>
							{data.name}
				 	 	</Link>
						<Divider type="vertical"/>
						<RespondentStatusTag status={data.status}/>
					</>
				}
				description={data.description}
			/>
		</List.Item>
	);
};

RespondentsList.Item.displayName = 'RespondentsList.Item';