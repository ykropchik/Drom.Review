import useSWR, { useSWRConfig } from 'swr';
import { EndPoints } from '../api/EndPoints';
import fetcher from '../api/fetcher';
import { useRouter } from 'next/router';

export default function useGrades() {
	const { mutate } = useSWRConfig();
	const { data, error } = useSWR(EndPoints.GRADES, fetcher);
	const router = useRouter();

	if (error === 401) {
		router.push('/login');
	}

	const update = () => {
		mutate(EndPoints.GRADES);
	};

	return {
		list: data,
		isLoading: !error && !data,
		isError: error,
		update: update
	};
}