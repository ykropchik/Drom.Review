import React, { useState } from 'react';
import { Empty, List, Modal } from 'antd';
import { PieChart } from '../PieChart/PieChart';
import styles from './StatisticModal.module.scss';
import { PieChartOutlined } from '@ant-design/icons';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import classNames from 'classnames';

export default function StatisticModal({ visible, onClose, reviewId }) {
	// const questions = useData(EndPoints.OPINIONS_STATISTIC(reviewId));
	const questions = test;
	const [selectedQuestion, setSelectedQuestion] = useState(null);

	return (
		<Modal className={styles.modal}
		       title="Статистика"
		       visible={visible}
		       onCancel={onClose}>
			<h2>Вопросы:</h2>
			<div className={styles.content}>
				<div className={styles.questions_list}>
					{
						questions.map((question, i) => (
							<div className={classNames(styles.question, { [styles.question_active]: selectedQuestion?.id === question.id })}
							     key={i} onClick={() => setSelectedQuestion(question)}>
								{question.text}
							</div>
						))
					}
				</div>
				<div className={styles.right_side}>
					{
						selectedQuestion ?
							<PieChart className={styles.chart} textSize={30} data={selectedQuestion.statistic}/>
							:
							<Empty className={styles.empty}
							       image={<PieChartOutlined style={{ fontSize: 40,  }}/>}
							       imageStyle={{ height: 40 }}
							       description="Выберите вопрос"/>
					}
				</div>
			</div>
		</Modal>
	);
}

const test = [
	{
		id: 1,
		text: 'Способен при необходимости принимать и отстаивать непопулярные решения',
		statistic: [
			{
				answer: 'Точно нет',
				count: 4,
			},
			{
				answer: 'Скорее нет',
				count: 10
			},
			{
				answer: 'Немного',
				count: 4,
			},
			{
				answer: 'Скорее да',
				count: 10
			},
			{
				answer: 'Точно да',
				count: 4,
			}
		]
	},
	{
		id: 2,
		text: 'Признает свою ответственность за результат',
		statistic: [
			{
				answer: 'Никогда',
				count: 2,
			},
			{
				answer: 'Редко',
				count: 3
			},
			{
				answer: 'Иногда',
				count: 4,
			},
			{
				answer: 'Часто',
				count: 10
			},
			{
				answer: 'Всегда',
				count: 4,
			}
		]
	},
	{
		id: 3,
		text: 'Насколько сильно человек спрогрессировал за прошедшие полгода?',
		statistic: [
			{
				answer: '1',
				count: 4,
			},
			{
				answer: '2',
				count: 10
			},
			{
				answer: '3',
				count: 4,
			},
			{
				answer: '4',
				count: 10
			},
			{
				answer: '5',
				count: 4,
			},
			{
				answer: '6',
				count: 10
			},
			{
				answer: '7',
				count: 4,
			},
			{
				answer: '8',
				count: 10
			},
			{
				answer: '9',
				count: 4,
			},
			{
				answer: '10',
				count: 10
			},
		]
	}
];
