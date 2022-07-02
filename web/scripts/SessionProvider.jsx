import React, { createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { EndPoints } from './api/EndPoints';

export const RoutsContext = createContext(null);

/**
 * @param {JSX.Element} children
 * @param {Session} session
 * @param {SessionConfig} config
 * @return {JSX.Element}
 * @constructor
 */
export default function SessionProvider({ children, user, config, onLogin, onLogout }) {
	const router = useRouter();

	useEffect(() => {
		if (user === null && router.pathname !== config.loginRoute) {
			router.push(config.loginRoute);
			return;
		}

		if (user !== null && router.pathname === config.loginRoute) {
			router.push(config.defaultRoute);
			return;
		}

		const userRoles = user?.roles;
		const routConfig = config.routes[router.pathname];

		if (routConfig && userRoles) {
			if (routConfig.forbiddenRoles) {
				if (rolesIntersect(userRoles, routConfig.forbiddenRoles)) {
					router.push(routConfig.redirectRoute);
				}
			} else {
				if (!rolesIntersect(userRoles, routConfig.allowedRoles)) {
					router.push(routConfig.redirectRoute);
				}
			}
		}

	}, [router.pathname, config, user]);


	return (
		<RoutsContext.Provider value={{user, onLogin, onLogout}}>
	        {children}
		</RoutsContext.Provider>
	);
}

function rolesIntersect(userRoles, configRoles) {
	return configRoles.some(role => userRoles.includes(role));
}

export function useSession() {
	const {user, onLogin, onLogout} = React.useContext(RoutsContext);
	let role = 'ROLE_USER';

	if (user?.roles.includes('ROLE_SCRUM')) {
		role = 'ROLE_SCRUM';
	} else if (user?.roles.includes('ROLE_LEAD')) {
		role = 'ROLE_LEAD';
	}

	async function signIn(credentials) {
		let result = await fetch(EndPoints.SIGN_IN, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		});
		const user = await result.json();

		if (!result.ok) {
			return Promise.reject(user);
		}

		localStorage.setItem('currentUser', JSON.stringify(user));
		onLogin(user);

		return Promise.resolve(user);
	}

	async function signOut() {
		// TODO: Реализовать endpoint для выхода из системы

		dropUser();
		onLogout();
	}

	function dropUser() {
		localStorage.removeItem('currentUser');
	}

	return {
		user,
		role,
		signIn,
		signOut,
	};
}

/**
 * @typedef {Object} SessionConfig
 * @property {string} loginRoute
 * @property {string} defaultRoute
 * @property {RoutConfig[]} routes
 */

/**
 * @typedef {Object} RoutConfig
 * @property {string[]} allowedRoles
 * @property {string[]} forbiddenRoles
 * @property {string} redirectRoute
 */