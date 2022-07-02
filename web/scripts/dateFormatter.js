const months = [
	'Января',
	'Февраля',
	'Марта',
	'Апреля',
	'Мая',
	'Июня',
	'Июля',
	'Августа',
	'Сентября',
	'Октября',
	'Ноября',
	'Декабря'
];

export default function dateFormatter(unixTime) {
	let dateObj = new Date(unixTime*1000);
	let day = dateObj.getDate();
	let month = dateObj.getMonth() + 1;
	let year = dateObj.getFullYear();
	return day + ' ' + months[month - 1] + ' ' + year;
}