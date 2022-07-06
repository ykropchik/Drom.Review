<?php

namespace App\DataFixtures;

use App\Entity\Qualification;
use App\Entity\User;
use App\Types\UserRoles;
use App\Utility\Transliterator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture implements DependentFixtureInterface
{
    private $hasher;
	public const USERS = [
		'user1' => 'Попов Глеб',
		'user2' => 'Рудакова Вероника',
		'user3' => 'Медведева Мадина',
		'user4' => 'Калугина Виктория',
		'user5' => 'Кузьмина Екатерина',
		'user6' => 'Рыжов Илья',
		'user7' => 'Козлова Алия',
		'user8' => 'Аксенова Анна',
		'user9' => 'Михайлова Кристина',
		'user10' => 'Сергеева Милана',
		'user11' => 'Александров Степан',
	];

	public const ROLES = [
		'user1' => UserRoles::SCRUM,
		'user2' => UserRoles::LEADER,
		'user3' => UserRoles::USER,
		'user4' => UserRoles::USER,
		'user5' => UserRoles::USER,
		'user6' => UserRoles::USER,
		'user7' => UserRoles::USER,
		'user8' => UserRoles::USER,
		'user9' => UserRoles::USER,
		'user10' => UserRoles::USER,
		'user11' => UserRoles::USER,
	];

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
		foreach (self::USERS as $userName => $fullName) {
			$user = new User();
			$surname = explode(' ', $fullName)[0];
			$email = strtolower(Transliterator::transliterate($surname)) . '@drom.ru';
			$user->setEmail($email);
			$user->setPassword($this->hasher->hashPassword($user, 'password'));
			$user->setFullName($fullName);
			$user->setRoles([self::ROLES[$userName]]);
			$manager->persist($user);
			$this->addReference($userName, $user);
		}

        $manager->flush();
    }

	public function getDependencies(): array
	{
		return [
			SpecializationFixtures::class,
			GradeFixtures::class,
		];
	}
}
