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
        $question1->setGrade($this->getReference('grade1'));
        $question1->setText('Что такое ссылки?');
        $question1->setRating(['Да', 'Нет']);
        $manager->persist($question1);

        $question2 = new Question();
        $question2->setSpecialization($this->getReference('specialization1'));
        $question2->setGrade($this->getReference('grade1'));
        $question2->setText('Какие основные операции с использованием ссылок?');
        $question2->setRating(['Да', 'Нет']);
        $manager->persist($question2);

        $question3 = new Question();
        $question3->setSpecialization($this->getReference('specialization1'));
        $question3->setGrade($this->getReference('grade2'));
        $question3->setText('Назовите простые типы данных, поддерживаемые в РНР?');
        $question3->setRating(['Да', 'Нет']);
        $manager->persist($question3);

        $question4 = new Question();
        $question4->setSpecialization($this->getReference('specialization2'));
        $question4->setGrade($this->getReference('grade1'));
        $question4->setText('Что такое рекурсия?');
        $question4->setRating(['Да', 'Нет']);
        $manager->persist($question4);

        $question5 = new Question();
        $question5->setSpecialization($this->getReference('specialization2'));
        $question5->setGrade($this->getReference('grade2'));
        $question5->setText('Какие знаете принципы ООП?');
        $question5->setRating(['Наследование', 'Инкапсуляция', 'Абстракция']);
        $manager->persist($question5);

        $question6 = new Question();
        $question6->setSpecialization($this->getReference('specialization2'));
        $question6->setGrade($this->getReference('grade2'));
        $question6->setText('Какая система типов используется в PHP? Опишите плюсы и минусы.');
        $question6->setRating(['Плюс', 'Минус']);
        $manager->persist($question6);

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
