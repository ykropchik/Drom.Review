import React, { useState } from 'react';
import { AutoComplete, Button, Form, Select } from 'antd';
import { Users } from '../../stubs/users';
import styles from './NewReviewForm.module.scss';

const { Option } = Select;

export default function NewReviewForm() {
	const [selectedUser, setSelectedUser] = useState(null);
	const [form] = Form.useForm();

	const onSelectHandler = (user) => {
		if (user === null) {
			form.resetFields();
		}

		setSelectedUser(user);
	};

	return (
		<Form wrapperCol={{ flex: '0 1 400px' }}
		      style={{ width: 'auto' }}
		      form={form}
		      validateTrigger="onBlur"
		      autoComplete="off"
		>
			<Form.Item className={styles.form_item} name="user">
				<AutoComplete placeholder="Выберите сотрудника"
				              options={Users}
				              allowClear
				              filterOption={(inputValue, option) =>
					              option?.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
				              }
				              onClear={() => onSelectHandler(null)}
				              onSelect={(_, user) => onSelectHandler(user)}
				              fieldNames={{ label: 'name', value: 'name' }}/>
			</Form.Item>
			<Form.Item className={styles.form_item} name="qualification">
				<Select optionLabelProp="label"
				        disabled={!selectedUser}
				        placeholder="Выберите квалификацию сотрудника">
					{
						selectedUser?.qualifications.map((item, i) =>
							<Option title={`${item.specialization} - ${item.grade}`}
							        value={`${item.specialization} - ${item.grade}`}
							        key={i}>
								{`${item.specialization} - ${item.grade}`}
							</Option>
						)
					}
				</Select>
			</Form.Item>
			<Form.Item className={styles.form_item}>
				<Button htmlType="submit" type="primary" >Создать</Button>
			</Form.Item>
		</Form>
	);
}