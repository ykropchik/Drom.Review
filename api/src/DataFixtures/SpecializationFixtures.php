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
        $specialization1->setName('Frontend');
		$specialization1->setGrades([
			$this->getReference('grade1'),
			$this->getReference('grade2'),
			$this->getReference('grade3'),
			$this->getReference('grade4'),
			$this->getReference('grade5'),
			$this->getReference('grade7'),
		]);
        $manager->persist($specialization1);
		$this->addReference('specialization1', $specialization1);

        $specialization2 = new Specialization();
        $specialization2->setName('Backend');
	    $specialization2->setGrades([
		    $this->getReference('grade1'),
		    $this->getReference('grade2'),
		    $this->getReference('grade3'),
		    $this->getReference('grade5'),
		    $this->getReference('grade6'),
	    ]);
        $manager->persist($specialization2);
		$this->addReference('specialization2', $specialization2);

        $manager->flush();
    }
}
