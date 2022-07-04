import React, { useEffect } from 'react';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { useSession } from '../../scripts/SessionProvider';

export default function Logout() {
	const { signOut } = useSession();

	useEffect(() => {
		signOut();
	}, []);

	return (
		<LoadingScreen isLoading={true}/>
	);
}