<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
	public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
	{
		$user = $event->getUser();
		$event->setData([
			'fullName' => $user->getFullName(),
			'email' => $user->getEmail(),
			'roles' => $user->getRoles(),
		]);
	}
}