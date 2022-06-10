import * as React from 'react';
import styles from './Hierarchy.module.scss';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export default function Hierarchy({ items, dataIndex, onItemClick, defaultSelect}) {
	const [selectedItem, selectItem] = useState(defaultSelect);

	useEffect(() => {
		onItemClick(defaultSelect);
		selectItem(defaultSelect);
	}, [onItemClick, defaultSelect]);

	const onItemClickHandler = (item) => {
		selectItem(item);
		onItemClick && onItemClick(item);
	};

	return (
		<div className={styles.content}>
			{
				items.map((item, i) =>
					<span className={styles.item} key={i}>
						<Tooltip title={onItemClick && 'Нажмите, чтобы увидеть подробности'} mouseEnterDelay={0.75}>
							<span className={classNames(styles.item_text, { [styles.item_text__selected]: Object.is(selectedItem, item) })}
							      style={onItemClick && { cursor: 'pointer' }}
							      onClick={() => onItemClickHandler(item)}>{item[dataIndex]}
								{/*{onItemClick && <InfoCircleOutlined className={styles.info_icon}/>}*/}
							</span>
						</Tooltip>
					</span>
				)
			}
		</div>
	);
}