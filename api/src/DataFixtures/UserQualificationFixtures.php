<?php

namespace App\DataFixtures;

use App\Entity\Qualification;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class UserQualificationFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $userQualification1 = new Qualification();
        $userQualification1->setSpecialization($this->getReference('specialization1'));
        $userQualification1->setGrade($this->getReference('grade1'));
		$this->getReference('user1')->addQualification($userQualification1);
        $manager->persist($userQualification1);

        $userQualification2 = new Qualification();
        $userQualification2->setSpecialization($this->getReference('specialization1'));
        $userQualification2->setGrade($this->getReference('grade2'));
		$this->getReference('user2')->addQualification($userQualification2);
        $manager->persist($userQualification2);

        $userQualification3 = new Qualification();
        $userQualification3->setSpecialization($this->getReference('specialization2'));
        $userQualification3->setGrade($this->getReference('grade1'));
		$this->getReference('user1')->addQualification($userQualification3);
        $manager->persist($userQualification3);

        $userQualification4 = new Qualification();
        $userQualification4->setSpecialization($this->getReference('specialization2'));
        $userQualification4->setGrade($this->getReference('grade2'));
		$this->getReference('user2')->addQualification($userQualification4);
        $manager->persist($userQualification4);

        $manager->flush();
    }

	public function getDependencies(): array
	{
		return [
			SpecializationFixtures::class,
			GradeFixtures::class,
			UserFixtures::class
		];
	}
}
