import { useState } from 'react';

export default function useRequest(endPoint, method = 'GET') {
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);

	const request = (data = {}) => {
		(async () => {
			try {
				setLoading(true);
				let res;
				if (method === 'GET') {
					res = await fetch(endPoint);
				} else {
					res = await fetch(endPoint, {
						method: method,
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(data)
					});
				}

				if (!res.ok) {
					setError(res.status);
				} else {
					setResult(await res.json());
				}
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		})();
	};

	return {
		request: request,
		data: result,
		isLoading: isLoading,
		error: error,
	};
}