import React, { useState } from 'react';
import { Button, Empty, Form, Input } from 'antd';
import styles from './RatingScaleEditor.module.scss';
import RatingScale from '../RatingScale/RatingScale';
import { PlusOutlined } from '@ant-design/icons';

export default function RatingScaleEditor({ value, onChange, ...props }) {
	const [inputValue, setInputValue] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const onAddValueHandler = () => {
		if (inputValue.trim() !== '' && !value?.includes(inputValue.trim())) {
			onChange(value ? value.concat([inputValue]) : [inputValue]);
			setInputValue('');
		}
	};

	const onChangeHandler = (e) => {
		setInputValue(e.target.value);
		setErrorMessage(null);

		if (value?.includes(e.target.value.trim())) {
			setErrorMessage('Такая оценка уже существует!');
		}
	};

	const onRemoveHandler = (item) => {
		const newValue = value.filter((rate) => item !== rate);
		onChange(newValue);
	};

	return (
		<div {...props} className={styles.content}>
	        <div className={styles.left_side}>
		        {
			        (!value || value.length === 0) &&
			        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
		        }
		        <RatingScale title={false} rating={value} vertical onRemove={onRemoveHandler}/>
	        </div>
			<div className={styles.right_side}>
				<Form.Item help={errorMessage} validateStatus={errorMessage !== null ? 'error' : 'success'}>
					<Input.Group compact>
						<Input className={styles.value_input} value={inputValue} onChange={onChangeHandler} onPressEnter={onAddValueHandler} allowClear/>
						<Button type="primary" onClick={onAddValueHandler} disabled={inputValue.trim().length === 0 || errorMessage !== null}><PlusOutlined/></Button>
					</Input.Group>
				</Form.Item>
			</div>
		</div>
	);
}