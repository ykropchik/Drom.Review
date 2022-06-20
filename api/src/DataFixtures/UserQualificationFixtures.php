<?php

namespace App\DataFixtures;

use App\Entity\UserQualification;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserQualificationFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $userQualification1 = new UserQualification();
        $userQualification1->setUserId(1);
        $userQualification1->setSpecializationId(1);
        $userQualification1->setGradeId(1);
        $manager->persist($userQualification1);

        $userQualification2 = new UserQualification();
        $userQualification2->setUserId(1);
        $userQualification2->setSpecializationId(2);
        $userQualification2->setGradeId(2);
        $manager->persist($userQualification2);

        $userQualification3 = new UserQualification();
        $userQualification3->setUserId(2);
        $userQualification3->setSpecializationId(1);
        $userQualification3->setGradeId(2);
        $manager->persist($userQualification3);

        $userQualification4 = new UserQualification();
        $userQualification4->setUserId(2);
        $userQualification4->setSpecializationId(2);
        $userQualification4->setGradeId(2);
        $manager->persist($userQualification4);

        $manager->flush();
    }
}
