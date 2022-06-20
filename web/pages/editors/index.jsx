import React from 'react';
import { Card, Divider } from 'antd';
import styles from '../../public/styles/pages/Editors.module.scss';
import Link from 'next/link';

export default function Editor() {
	return (
		<>
			<Divider orientation="left">Редакторы</Divider>
			<div className={styles.content}>
				<Link href={'/editors/gradesEditor'}>
					<Card className={styles.card} hoverable>Редактор грейдов</Card>
				</Link>
				<Link href={'/editors/specEditor'}>
					<Card className={styles.card} hoverable>Редактор специализаций</Card>
				</Link>
				<Link href={'/editors/questionsEditor'}>
					<Card className={styles.card} hoverable>Редактор вопросов</Card>
				</Link>
			</div>
		</>
	);
}