import * as React from 'react';
import useWindowSize from '../../scripts/hooks/useWindowSize';
import styles from './TabPaneItem.module.scss';

export default function TabPaneItem({ icon, title }) {
	const { width } = useWindowSize();

	const createIconWithClass = (icon) => {
		return React.cloneElement(icon, { className: styles.tab_icon });
	};

	return (
		<span >
			{icon && createIconWithClass(icon)}
			{width > 420 && <span className={styles.tab_title}>{title}</span>}
		</span>
	);
}