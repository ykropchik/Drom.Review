import React from 'react';
import styles from './Hierarchy.module.scss';
import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from '../../scripts/arrayMove';

export default function Hierarchy({ items, dataIndex, onItemClick, defaultSelect, editable}) {
	const [selfItems, setSelfItems] = useState([]);
	const [selectedItem, selectItem] = useState(defaultSelect);

	useEffect(() => {
		setSelfItems(items);
	}, [items]);

	useEffect(() => {
		onItemClick && onItemClick(defaultSelect);
		selectItem(defaultSelect);
	}, [onItemClick, defaultSelect]);

	const onItemClickHandler = (item) => {
		selectItem(item);
		onItemClick && onItemClick(item);
	};

	const onSortEnd = ({oldIndex, newIndex}) => {
		setSelfItems(arrayMove(selfItems, oldIndex, newIndex));
	};

	return (
		<div className={styles.content}>
			{
				editable
					?
					<SortableList items={selfItems} onSortEnd={onSortEnd} />
					:
					selfItems.map((item, i) =>
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

const SortableList = SortableContainer(({ items }) => {
	return (
		<div className={styles.content}>
			{
				items.map(({name}, index) => (
					<SortableItem key={`item-${name}`} index={index} value={name} />
				))
			}
		</div>
	);
});

const SortableItem = SortableElement(({value}) => {
	return (
		<div className={styles.item__editable}>
			<span className={styles.item_text}>
				{value}
			</span>
		</div>
	);
});