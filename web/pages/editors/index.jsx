import React from 'react';
import { Card } from 'antd';
import styles from '../../public/styles/pages/editor.module.scss';
import Link from 'next/link';

export default function Editor() {
	return (
		<Card bodyStyle={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
		      title="Редакторы">
			<Link href={'/editors/gradesEditor'}>
				<Card.Grid className={styles.card}>Редактор грейдов</Card.Grid>
			</Link>
			<Card.Grid className={styles.card}>Редактор специализаций</Card.Grid>
			<Card.Grid className={styles.card}>Редактор шаблонов</Card.Grid>
		</Card>
	);
}