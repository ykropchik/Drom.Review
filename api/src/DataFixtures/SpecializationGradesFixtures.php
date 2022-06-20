<?php

namespace App\DataFixtures;

use App\Entity\SpecializationGrades;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class SpecializationGradesFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $specializationGrade1 = new SpecializationGrades();
        $specializationGrade1->setSpecializationId(1);
        $specializationGrade1->setGradeId(1);
        $manager->persist($specializationGrade1);

        $specializationGrade2 = new SpecializationGrades();
        $specializationGrade2->setSpecializationId(1);
        $specializationGrade2->setGradeId(2);
        $manager->persist($specializationGrade2);

        $specializationGrade3 = new SpecializationGrades();
        $specializationGrade3->setSpecializationId(2);
        $specializationGrade3->setGradeId(1);
        $manager->persist($specializationGrade3);

        $specializationGrade4 = new SpecializationGrades();
        $specializationGrade4->setSpecializationId(2);
        $specializationGrade4->setGradeId(2);
        $manager->persist($specializationGrade4);

        $manager->flush();
    }
}
