import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './LoadingScreen.module.scss';
import classNames from 'classnames';

export default function LoadingScreen({ isLoading }) {
	const [open, setOpen] = useState(isLoading);
	const [animation, setAnimation] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setAnimation(true);
		}, 2000);
	}, []);

	useEffect(() => {
		if (open === true && isLoading === false) {
			setAnimation(true);
			setTimeout(() => {
				setOpen(false);
			}, 2000);
		}
	}, [open, isLoading]);

	return (
		<div className={classNames(styles.content, { [styles.content_anim]: animation, [styles.content_close]: !open })}>
			<Spin spinning={true} indicator={<LoadingOutlined className={styles.spinner}/>}/>
		</div>
	);
}