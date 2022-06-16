import useSWR, { useSWRConfig } from 'swr';
import fetcher from '../api/fetcher';

export default function useData(endPoint) {
	const { mutate } = useSWRConfig();
	const { data, error } = useSWR(endPoint, fetcher);

	const update = () => {
		mutate(endPoint);
	};

	return {
		list: data,
		isLoading: !error && !data,
		isError: error,
		update: update
	};
}