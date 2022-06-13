export default function fetcher(url) {
	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				return Promise.reject(res.status);
			}

			return res.json();
		});
}