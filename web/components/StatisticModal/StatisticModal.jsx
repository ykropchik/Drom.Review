import React, { useState } from 'react';
import { Empty, Modal, Spin } from 'antd';
import { PieChart } from '../PieChart/PieChart';
import styles from './StatisticModal.module.scss';
import { PieChartOutlined } from '@ant-design/icons';
import useData from '../../scripts/hooks/useData';
import { EndPoints } from '../../scripts/api/EndPoints';
import classNames from 'classnames';

export default function StatisticModal({ visible, onClose, reviewId }) {
	const { data: questions, isLoading } = useData(EndPoints.OPINIONS_STATISTIC(reviewId));
	const [selectedQuestion, setSelectedQuestion] = useState(null);

	return (
		<Modal className={styles.modal}
		       title="Статистика"
		       visible={visible}
		       onCancel={onClose}
		       footer={null}>
			{
				isLoading ?
					<Spin/>
					:
					<>
						<h2>Вопросы:</h2>
						<div className={styles.content}>
							<div className={styles.questions_list}>
								{
									questions?.map((question, i) => (
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
										<PieChart textSize={30} data={selectedQuestion.statistic}/>
										:
										<Empty className={styles.empty}
										       image={<PieChartOutlined style={{ fontSize: 40,  }}/>}
										       imageStyle={{ height: 40 }}
										       description="Выберите вопрос"/>
								}
							</div>
						</div>
					</>
			}
		</Modal>
	);
}

// const test = [
// 	{
// 		id: 1,
// 		text: 'Способен при необходимости принимать и отстаивать непопулярные решения',
// 		statistic: [
// 			{
// 				estimate: 'Точно нет',
// 				count: 4,
// 			},
// 			{
// 				estimate: 'Скорее нет',
// 				count: 10
// 			},
// 			{
// 				estimate: 'Немного',
// 				count: 4,
// 			},
// 			{
// 				estimate: 'Скорее да',
// 				count: 10
// 			},
// 			{
// 				estimate: 'Точно да',
// 				count: 4,
// 			}
// 		]
// 	},
// 	{
// 		id: 2,
// 		text: 'Признает свою ответственность за результат',
// 		statistic: [
// 			{
// 				estimate: 'Никогда',
// 				count: 2,
// 			},
// 			{
// 				estimate: 'Редко',
// 				count: 3
// 			},
// 			{
// 				estimate: 'Иногда',
// 				count: 4,
// 			},
// 			{
// 				estimate: 'Часто',
// 				count: 10
// 			},
// 			{
// 				estimate: 'Всегда',
// 				count: 4,
// 			}
// 		]
// 	},
// 	{
// 		id: 3,
// 		text: 'Насколько сильно человек спрогрессировал за прошедшие полгода?',
// 		statistic: [
// 			{
// 				estimate: '1',
// 				count: 4,
// 			},
// 			{
// 				estimate: '2',
// 				count: 10
// 			},
// 			{
// 				estimate: '3',
// 				count: 4,
// 			},
// 			{
// 				estimate: '4',
// 				count: 10
// 			},
// 			{
// 				estimate: '5',
// 				count: 4,
// 			},
// 			{
// 				estimate: '6',
// 				count: 10
// 			},
// 			{
// 				estimate: '7',
// 				count: 4,
// 			},
// 			{
// 				estimate: '8',
// 				count: 10
// 			},
// 			{
// 				estimate: '9',
// 				count: 4,
// 			},
// 			{
// 				estimate: '10',
// 				count: 10
// 			},
// 		]
// 	}
// ];
