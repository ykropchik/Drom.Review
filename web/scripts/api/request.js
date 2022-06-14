/**
 * @param {string} endPoint
 * @param {string} method
 * @param {Object} data
 * @param {Object} params
 * @return {Promise<unknown>}
 */
export default async function request(endPoint, method = 'GET', data = {}, params = {}) {
	let url = new URL(endPoint);
	url.search = new URLSearchParams(params);
	let res;
	if (method === 'GET') {
		res = await fetch(url);
	} else {
		res = await fetch(url, {
			method: method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
	}

	if (!res.ok) {
		return Promise.reject(res.status);
	}

	let result = await res.json();

	if (result?.status >= 400) {
		return Promise.reject(result.status);
	}

	return Promise.resolve();
}