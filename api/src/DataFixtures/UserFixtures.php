<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        $user1 = new User();
        $user1->setEmail('scrum@drom.ru');
        $user1->setPassword($this->hasher->hashPassword($user1, 'password'));
        $user1->setFullName('Харитонов Леонид Вячеславович');
		$user1->setRoles(['ROLE_SCRUM']);
        $manager->persist($user1);
		$this->addReference('user1', $user1);

        $user2 = new User();
        $user2->setEmail('leader@drom.ru');
        $user2->setPassword($this->hasher->hashPassword($user2, 'password'));
        $user2->setFullName('Некрасова Береслава Владиславовна');
		$user2->setRoles(['ROLE_LEADER']);
        $manager->persist($user2);
	    $this->addReference('user2', $user2);

	    $user3 = new User();
	    $user3->setEmail('default@drom.ru');
	    $user3->setPassword($this->hasher->hashPassword($user3, 'password'));
	    $user3->setFullName('Гаврилов Илларион Николаевич');
	    $manager->persist($user3);
	    $this->addReference('user3', $user3);

        $manager->flush();
    }
}
