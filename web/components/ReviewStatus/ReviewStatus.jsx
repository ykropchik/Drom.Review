import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import getAvatarPlaceholder from '../../scripts/avatarPlaceholder';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import styles from './ReviewStatus.module.scss';
import { reviewStatusInfo } from '../../configs/reviewStatus';

export default function ReviewStatus({ author, step, comment }) {
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
				<div className={styles.status_icon}>{reviewStatusInfo[step].icon}</div>
				<div className={styles.avatar_container}>
					<UserAvatar avatarPlaceholder={getAvatarPlaceholder(author.name)} size={24}/>
				</div>
				<div className={styles.right_side}>
					<div className={styles.header}>
						<span className={styles.author}>{author.name}</span>
						<span className={styles.status}>{reviewStatusInfo[step].description}</span>
					</div>
					<MarkdownRender mdText={comment}/>
				</div>
			</div>
		</div>
	);
}