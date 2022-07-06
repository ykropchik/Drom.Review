<?php

namespace App\DataFixtures;

use App\Entity\Question;
use App\Entity\Specialization;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class QuestionFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $question1 = new Question();
        $question1->setSpecialization($this->getReference('specialization1'));
        $question1->setGrade($this->getReference('grade3'));
        $question1->setText('Способен при необходимости принимать и отстаивать непопулярные решения');
        $question1->setRating(['Точно нет', 'Скорее нет', 'Немного', 'Скорее да', 'Точно да']);
        $manager->persist($question1);

	    $question1 = new Question();
	    $question1->setSpecialization($this->getReference('specialization1'));
	    $question1->setGrade($this->getReference('grade3'));
	    $question1->setText('Признает свою ответственность за результат');
	    $question1->setRating(['Никогда', 'Редко', 'Иногда', 'Часто', 'Всегда']);
	    $manager->persist($question1);

	    $question1 = new Question();
	    $question1->setSpecialization($this->getReference('specialization1'));
	    $question1->setGrade($this->getReference('grade3'));
	    $question1->setText('Насколько сильно человек спрогрессировал за прошедшие полгода?');
	    $question1->setRating(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
	    $manager->persist($question1);

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
