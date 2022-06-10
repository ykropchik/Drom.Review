/**
 * Имитация долгого асинхронного запроса
 * @param {int} time Время в мс
 * @param {number} rejectProbability вероятность reject в процентах ( от 0 до 100)
 * @return {Promise<void>}
 */
export default async function timeout(time, rejectProbability = 0) {
	await new Promise((resolve, reject) => setTimeout(() => {
		if (rejectProbability === 0) {
			return resolve();
		}

		if (rejectProbability === 100) {
			return reject();
		}

		if (Math.floor(Math.random() * 100) <= rejectProbability) {
			return reject();
		}

		return resolve();
	}, time));
}
