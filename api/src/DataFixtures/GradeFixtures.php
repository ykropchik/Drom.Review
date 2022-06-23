<?php

namespace App\DataFixtures;

use App\Entity\Grade;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GradeFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $grade1 = new Grade();
        $grade1->setName('Junior Start');
        $grade1->setDescription('Специалист, умеющий на базовом уровне работать с принятыми в проекте технологиями, но не имеющий за плечами ни «багажа» из пары лет опыта, ни знаний по текущему проекту.');
        $manager->persist($grade1);
		$this->addReference('grade1', $grade1);

        $grade2 = new Grade();
        $grade2->setName('Middle');
        $grade2->setDescription('Опытный сотрудник, готовый к самостоятельной работе.');
        $manager->persist($grade2);
		$this->addReference('grade2', $grade2);

        $manager->flush();
    }
}
