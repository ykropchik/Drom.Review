import React, { useState } from 'react';
import { AutoComplete, Button, Form, Select } from 'antd';
import styles from './NewReviewForm.module.scss';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';

const { Option } = Select;

export default function NewReviewForm() {
	const users = useData(EndPoints.USERS);
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
				              options={users.data}
				              loading={users.isLoading}
				              allowClear
				              filterOption={(inputValue, option) =>
					              option?.fullName.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
				              }
				              onClear={() => onSelectHandler(null)}
				              onSelect={(_, user) => onSelectHandler(user)}
				              fieldNames={{ label: 'fullName', value: 'fullName' }}/>
			</Form.Item>
			<Form.Item className={styles.form_item} name="qualification">
				<Select optionLabelProp="label"
				        disabled={!selectedUser}
				        placeholder="Выберите квалификацию сотрудника"
				        onSelect={console.log}>
					{
						selectedUser?.qualifications.map((item, i) =>
							<Option title={`${item.specialization.name} - ${item.grade.name}`}
							        value={`${item.specialization.name} - ${item.grade.name}`}
							        item={item}
							        key={i}>
								{`${item.specialization.name} - ${item.grade.name}`}
							</Option>
						)
					}
				</Select>
			</Form.Item>
			<Form.Item className={styles.form_item} name="lead">
				<AutoComplete placeholder="Выберите ответственного за проверку"
				              disabled={!selectedUser}
				              options={users.data}
				              isLoading={users.isLoading}
				              allowClear
				              filterOption={(inputValue, option) =>
					              option?.fullName.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
				              }
				              fieldNames={{ label: 'fullName', value: 'fullName' }}/>
			</Form.Item>
			<Form.Item className={styles.form_item}>
				<Button htmlType="submit" type="primary" >Создать</Button>
			</Form.Item>
		</Form>
	);
}