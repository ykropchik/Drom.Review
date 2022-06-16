import useSWR, { useSWRConfig } from 'swr';
import fetcher from '../api/fetcher';
import { useRouter } from 'next/router';

export default function useData(endPoint) {
	const { mutate } = useSWRConfig();
	const { data, error } = useSWR(endPoint, fetcher);
	const router = useRouter();

	if (error === 401) {
		router.push('/login');
	}

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