import React from 'react';
import { Tag as AntTag } from 'antd';
import styles from './Tag.module.scss';

export default function Tag({ type = 'default', icon, children }) {
	const className = getClassName(type);

	return (
		<AntTag className={className} icon={icon}>
			{children}
		</AntTag>
	);

}
const getClassName = (type) => {
	switch (type) {
		case 'success':
			return styles.tag__success;
		case 'error':
			return styles.tag__error;
		case 'warning':
			return styles.tag__warning;
		case 'process':
			return styles.tag__process;
		case 'default':
			return styles.tag__default;
	}
};
