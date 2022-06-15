import React from 'react';
import styles from './Hierarchy.module.scss';
import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from '../../scripts/arrayMove';

export default function Hierarchy({ value, dataIndex, onItemClick, onChange, defaultSelect, sortable = false}) {
	const [items, setItems] = useState(value);

	useEffect(() => {
		setItems(value);
	}, [value]);

	const onSortEnd = ({oldIndex, newIndex}) => {
		let newItems = arrayMove(items, oldIndex, newIndex);
		setItems(newItems);
		onChange && onChange(newItems);
	};

	return sortable ?
		<SortableList items={items} onSortEnd={onSortEnd}/>
		:
		<UnsortableList items={items} dataIndex={dataIndex} defaultSelect={defaultSelect} onItemClick={onItemClick}/>;
}

const UnsortableList = ({ items, dataIndex, defaultSelect, onItemClick }) => {
	const [selectedItem, selectItem] = useState(defaultSelect);

	useEffect(() => {
		onItemClick && onItemClick(defaultSelect);
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
							<span className={
								classNames({
									[styles.item_text__selected]: Object.is(selectedItem, item),
									[styles.item_text__clickable]: onItemClick !== undefined
								})}
							      style={onItemClick && { cursor: 'pointer' }}
							      onClick={() => onItemClickHandler(item)}>{item[dataIndex]}
							</span>
						</Tooltip>
					</span>
				)
			}
		</div>
	);
};

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
		<div className={styles.item}>
			<span className={styles.item_text__clickable}>
				{value}
			</span>
		</div>
	);
});