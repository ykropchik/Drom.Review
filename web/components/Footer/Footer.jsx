import * as React from 'react';
import { Footer as AntFooter } from 'antd/lib/layout/layout';
import styles from './Footer.module.scss';

export default function Footer({ children }) {
	return (
		<AntFooter className={styles.content}>
			{children}
			<div className={styles.copyright}>Created by ykropchik and&nbsp;neu_net&nbsp;©&nbsp;2022</div>
		</AntFooter>
	);
}