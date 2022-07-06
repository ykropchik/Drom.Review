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
        $userQualification1->setGrade($this->getReference('grade3'));
		$this->getReference('user3')->addQualification($userQualification1);
        $manager->persist($userQualification1);

        $userQualification2 = new Qualification();
        $userQualification2->setSpecialization($this->getReference('specialization1'));
        $userQualification2->setGrade($this->getReference('grade5'));
		$this->getReference('user2')->addQualification($userQualification2);
        $manager->persist($userQualification2);

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
