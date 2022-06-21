import React from 'react';
import { Divider, PageHeader, Select } from 'antd';
import { useRouter } from 'next/router';
import { questions } from '../../stubs/questions';
import MarkdownRender from '../../components/MarkdownRender/MarkdownRender';
import styles from '../../public/styles/pages/Opinion.module.scss';
import MarkdownEditor from '../../components/MarkdownEditor/MarkdownEditor';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { Users } from '../../stubs/users.js';

export default function Opinion() {
	const router = useRouter();

	const onRateSelectHandler = (question, rating) => {
		console.log(question, rating);
	};

	return (
		<PageHeader title="360-мнение"
		            onBack={() => router.push('/')}
		            subTitle={<div className={styles.subject_container}><UserAvatar avatarUrl={Users[0].avatarUrl} userName={Users[0].name} size={32}/>{Users[0].name}</div>}>
			<div className={styles.content}>
				<Divider/>
				{
					questions.map((question, i) =>
						<>
							<div className={styles.question} key={i}>
								<MarkdownRender className={styles.question_text} mdText={question.text}/>
								<Select className={styles.question_rating}
								        placeholder="Выберите оценку"
								        onSelect={(value) => onRateSelectHandler(question, value)}>
									{
										question.rating.map((item, i) =>
											<Select.Option value={item} key={i}>
												{item}
											</Select.Option>
										)
									}
								</Select>
							</div>
							{questions.length - 1 !== i && <Divider/>}
						</>
					)
				}
				<br/>
				<Divider orientation="left">Комментарий (необязательно):</Divider>
				<MarkdownEditor/>
			</div>
		</PageHeader>
	);
}