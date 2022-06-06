/**
 * Имитация долгого асинхронного запроса
 * @param {int} time Время в мс
 * @param {boolean} isRejected true - вернется rejected, false - вернется resolve
 * @return {Promise<void>}
 */
export default async function timeout(time, isRejected) {
	await new Promise((resolve, reject) => setTimeout(() => {
		if (isRejected) {
			reject();
		} else {
			resolve();
		}
	}, time));
}
