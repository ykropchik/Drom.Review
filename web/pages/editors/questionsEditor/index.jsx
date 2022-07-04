import React, { useState } from 'react';
import { AutoComplete, Button, Divider, Empty, message, PageHeader, Spin } from 'antd';
import { useRouter } from 'next/router';
import useData from '../../../scripts/hooks/useData';
import { EndPoints } from '../../../scripts/api/EndPoints';
import styles from '../../../public/styles/pages/QuestionsEditor.module.scss';
import useRequest from '../../../scripts/hooks/useRequest';
import { PlusOutlined, SelectOutlined } from '@ant-design/icons';
import QuestionsList from '../../../components/QuestionsList/QuestionsList';
import QuestionForm from '../../../components/QuestionForm/QuestionForm';
import request from '../../../scripts/api/request';

export default function QuestionsEditor() {
	const router = useRouter();
	const specializations = useData(EndPoints.SPECIALIZATIONS_FULL);
	const [selectedSpec, setSelectedSpec] = useState(null);
	const [selectedGrade, setSelectedGrade] = useState(null);
	const [creatingQuestion, setCreatingQuestion] = useState(false);
	const [isFormVisible, setFormVisible] = useState(false);
	const questions = useRequest(EndPoints.QUESTIONS);

	const onGradeSelectHandler = (grade) => {
		if (grade !== null) {
			setSelectedGrade(grade);
			questionsUpdate(grade);
		} else {
			setSelectedGrade(null);
		}
	};

	const onSaveClickHandler = (data) => {
		setCreatingQuestion(true);
		request(EndPoints.QUESTIONS, 'POST', {...data, 'specialization_id': selectedSpec.id, 'grade_id': selectedGrade.id })
			.finally(() => {
				setCreatingQuestion(false);
			})
			.then(() => onCreateSuccess())
			.catch(() => onCreateFailure());
	};

	const onCreateSuccess = () => {
		setFormVisible(false);
		questionsUpdate();
		message.success('Вопрос успешно создан');
	};

	const onCreateFailure = () => {
		message.error('Произошла ошибка! Попробуйте позже.');
	};

	const questionsUpdate = (grade = null) => {
		questions.request(null, { 'specialization_id': selectedSpec.id, 'grade_id': grade ? grade.id : selectedGrade.id });
	};

	return (
		<>
			<PageHeader title="Редактор вопросов" onBack={() => router.push('/editors')}>
				<div className={styles.content}>
					<div className={styles.filters}>
						<AutoComplete placeholder="Выберите специализацию"
						              style={{ width: 200 }}
						              value={selectedSpec?.name}
						              options={specializations.data}
						              filterOption={(inputValue, option) =>
							              option?.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						              }
						              onClear={() => {
										  setSelectedSpec(null);
										  setSelectedGrade(null);
						              }}
						              allowClear
						              onSelect={(_, item) => setSelectedSpec(item)}
						              fieldNames={{ label: 'name', value: 'name' }}/>
						<AutoComplete placeholder="Выберите грейд"
						              value={selectedGrade?.name}
						              style={{ width: 200 }}
						              options={selectedSpec?.grades}
						              disabled={selectedSpec === null}
						              filterOption={(inputValue, option) =>
							              option?.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						              }
						              onClear={() => onGradeSelectHandler(null)}
						              allowClear
						              onSelect={(_, item) => onGradeSelectHandler(item)}
						              fieldNames={{ label: 'name', value: 'name' }}/>
					</div>
					<div className={styles.questions__container}>
						{
							questions.isLoading ?
								<Spin/>
								:
								selectedGrade === null ?
									<Empty className={styles.empty_container} image={<SelectOutlined style={{ fontSize: 86 }}/>}
									       description="Выберите специализацию и грейд"/>
									:
									<>
										<Button className={styles.add_button} type="dashed" icon={<PlusOutlined/>} onClick={() => setFormVisible(true)}>Добавить вопрос</Button>
										<Divider/>
										<QuestionsList className={styles.questions_list} questions={questions.data} onChange={questionsUpdate}/>
									</>
						}
					</div>
				</div>
				<QuestionForm visible={isFormVisible}
				              title="Создание вопроса"
				              isLoading={creatingQuestion}
				              onCancelClick={() => setFormVisible(false)}
				              saveButtonText="Создать"
				              onSaveClick={onSaveClickHandler}/>
			</PageHeader>
		</>
	);
}