import { useState } from 'react';

export default function useGetData(fetchFunction) {
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState(null);

	function getData() {
		(async () => {
			try {
				setLoading(true);
				setData(await fetchFunction.apply(null, arguments));
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		})();
	}

	return { data, isLoading, error, getData };
}