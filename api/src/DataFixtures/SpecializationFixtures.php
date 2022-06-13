<?php

namespace App\DataFixtures;

use App\Entity\Specialization;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class SpecializationFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $specialization1 = new Specialization();
        $specialization1->setName('Frontend-разработчик');
        $manager->persist($specialization1);

        $specialization2 = new Specialization();
        $specialization2->setName('Backend-разработчик');
        $manager->persist($specialization2);

        $manager->flush();
    }
}
