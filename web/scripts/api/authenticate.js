import { EndPoints } from './EndPoints';
import { ErrorType } from './ErrorType';

export default async function authenticate(data) {
	let result = await fetch(EndPoints.SIGN_IN, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!result.ok) {
		return Promise.reject(ErrorType[result.status]);
	}

	return Promise.resolve();
}