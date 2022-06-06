/**
 * Возвращает 2 буквы: первая буква фамилии + первая буква имени
 * @param {string} fullName ФИО
 * @return {string}
 */
export default function getAvatarPlaceholder(fullName) {
	let nameArray = fullName.split(' ');

	return nameArray[0][0].toUpperCase() + nameArray[1][0].toUpperCase();
}