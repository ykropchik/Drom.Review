export default function arrayMove(array, from, to) {
	let result = array.slice();
	result.splice(to < 0 ? array.length + to : to, 0, result.splice(from, 1)[0]);
	return result;
}