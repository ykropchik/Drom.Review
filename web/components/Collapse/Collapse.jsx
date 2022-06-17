import React, { useEffect, useRef, useState } from 'react';
import styles from './Collapse.module.scss';
import AnimateHeight from 'react-animate-height';
import { Button } from 'antd';

export default function Collapse({ children, maxHeight = 50 }) {
	const contentRef = useRef();
	const [collapsible, setCollapsible] = useState(true);
	const [collapsed, setCollapsed] = useState(true);

	useEffect(() => {
		checkContentHeight();
		window.addEventListener('resize', checkContentHeight, true);

		return () => window.removeEventListener('resize', checkContentHeight, true);
	}, []);

	const checkContentHeight = () => {
		if (contentRef.current.clientHeight > maxHeight) {
			setCollapsible(true);
			setCollapsed(true);
		} else {
			setCollapsible(false);
			setCollapsed(false);
		}
	};

	const onClickHandler = () => {
		setCollapsed((old) => !old);
	};

	return (
		<div className={styles.content}>
			<AnimateHeight duration={250} height={collapsed ? maxHeight + 70 : 'auto'}>
				{React.cloneElement(children, { forwardRef: contentRef, style: { marginBottom: collapsible && 80 } })}
			</AnimateHeight>
			{
				collapsible &&
				<div className={styles.content__footer}>
					<Button type="link" onClick={onClickHandler}>{collapsed ? 'Показать больше' : 'Скрыть'}</Button>
				</div>
			}
		</div>
	);
}