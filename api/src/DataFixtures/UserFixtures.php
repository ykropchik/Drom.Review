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
        $user1->setEmail('admin@drom_review.ru');
        $user1->setPassword($this->hasher->hashPassword($user1, 'password'));
        $user1->setFullName('Зыков Михаил Григорьевич');
        $manager->persist($user1);
		$this->addReference('user1', $user1);

        $user2 = new User();
        $user2->setEmail('admin2@drom_review.ru');
        $user2->setPassword($this->hasher->hashPassword($user2, 'password'));
        $user2->setFullName('Лебедев Вячеслав Романович');
        $manager->persist($user2);
	    $this->addReference('user2', $user2);

        $manager->flush();
    }
}
