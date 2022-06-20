import React, { useState } from 'react';
import { AutoComplete, Button, Empty, PageHeader, Spin } from 'antd';
import { useRouter } from 'next/router';
import useData from '../../../scripts/hooks/useData';
import { EndPoints } from '../../../scripts/api/EndPoints';
import styles from '../../../public/styles/pages/QuestionsEditor.module.scss';
import useRequest from '../../../scripts/hooks/useRequest';
import { PlusOutlined, SelectOutlined } from '@ant-design/icons';
import Spinner from '../../../components/Spinner/Spinner';
import QuestionsList from '../../../components/QuestionsList/QuestionsList';
import { questions as questionsStub } from '../../../stubs/questions';
import QuestionForm from '../../../components/QuestionForm/QuestionForm';

export default function QuestionsEditor() {
	const router = useRouter();
	const specializations = useData(EndPoints.SPECIALIZATIONS_FULL);
	const [selectedSpec, setSelectedSpec] = useState(null);
	const [selectedGrade, setSelectedGrade] = useState(null);
	const [creatingQuestion, setCreatingQuestion] = useState(false);
	const questions = useRequest(EndPoints.QUESTIONS);

	const onGradeSelectHandler = (grade) => {
		if (grade !== null) {
			setSelectedGrade(grade);
			questions.request();
		} else {
			setSelectedGrade(null);
		}
	};

	const onSaveClickHandler = (data) => {
		console.log(data);
	};

	return (
		<>
			<PageHeader title="Редактор вопросов" onBack={() => router.push('/editors')}/>
			<div className={styles.content}>
				<div className={styles.filters}>
					<AutoComplete placeholder="Выберите специализацию"
						              style={{ width: 200 }}
						              value={selectedSpec?.name}
						              options={specializations.list}
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
							<Spin indicator={<Spinner size={48}/>} spinning/>
							:
							selectedGrade === null ?
								<Empty className={styles.empty_container} image={<SelectOutlined style={{ fontSize: 86 }}/>}
									       description="Выберите специализацию и грейд"/>
								:
								<>
									<Button type="dashed" icon={<PlusOutlined/>} onClick={() => setCreatingQuestion(true)}>Добавить вопрос</Button>
									<QuestionsList className={styles.questions_list} questions={questionsStub}/>
								</>
					}
				</div>
			</div>
			<QuestionForm visible={creatingQuestion}
			              title="Создание вопроса"
			              onCancelClick={() => setCreatingQuestion(false)}
			              saveButtonText="Создать"
			              onSaveClick={onSaveClickHandler}/>
		</>
	);
}