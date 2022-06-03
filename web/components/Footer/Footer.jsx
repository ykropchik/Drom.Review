import * as React from 'react';
import { Footer as AntFooter } from 'antd/lib/layout/layout';
import styles from './Footer.module.css';

export default function Footer({ children }) {
	return (
		<AntFooter className={styles.content}>
			{children}
			<div className={styles.copyright}>Created by ykropchik 2022</div>
		</AntFooter>
	);
}