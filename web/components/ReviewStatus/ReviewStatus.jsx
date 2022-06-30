import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import styles from './ReviewStatus.module.scss';
import { reviewHistoryInfo } from '../../configs/reviewInfo';

export default function ReviewStatus({ author, action, comment }) {
	// if (comment === '') {
	// 	return (
	// 		<div className={styles.without_comment}>
	// 			<div className={styles.inner}>
	// 				<div className={styles.avatar_container}>
	// 					<UserAvatar avatarPlaceholder={getAvatarPlaceholder(author.name)} size={32}/>
	// 				</div>
	// 				<div className={styles.right_side}>
	// 					<div className={styles.header}>
	// 						<span className={styles.author}>{author.name}</span>
	// 						<span className={styles.status}>{reviewStatusTranslate[status]}</span>
	// 					</div>
	// 					<div className={styles.comment}>
	// 						<MarkdownRender mdText={comment}/>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// } else {
	// 	return (
	// 		<Comment className={styles.with_comment} author={author.name}
	// 		         avatar={<UserAvatar avatarPlaceholder={getAvatarPlaceholder(author.name)} size={32}/>}
	// 		         content={<MarkdownRender mdText={comment}/>}
	// 		         datetime={<span>{reviewStatusTranslate[status]}</span>}/>
	// 	);
	// }
	return (
		<div className={styles.without_comment}>
			<div className={styles.inner}>
				<div className={styles.status_icon}>{reviewHistoryInfo[action]?.icon}</div>
				<div className={styles.avatar_container}>
					<UserAvatar size={24}>
						{getAvatarPlaceholder(author.name)}
					</UserAvatar>
				</div>
				<div className={styles.right_side}>
					<div className={styles.header}>
						<span className={styles.author}>{author.name}</span>
						<span className={styles.status}>{reviewHistoryInfo[action]?.description}</span>
					</div>
					<MarkdownRender mdText={comment}/>
				</div>
			</div>
		</div>
	);
}