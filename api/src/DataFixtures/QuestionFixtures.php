<?php

namespace App\DataFixtures;

use App\Entity\Question;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class QuestionFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $question1 = new Question();
        $question1->setSpecializationId(1);
        $question1->setGradeId(1);
        $question1->setText('Что такое ссылки?');
        $question1->setRating(['Да', 'Нет']);
        $manager->persist($question1);

        $question2 = new Question();
        $question2->setSpecializationId(1);
        $question2->setGradeId(1);
        $question2->setText('Какие основные операции с использованием ссылок?');
        $question2->setRating(['Да', 'Нет']);
        $manager->persist($question2);

        $question3 = new Question();
        $question3->setSpecializationId(1);
        $question3->setGradeId(2);
        $question3->setText('Назовите простые типы данных, поддерживаемые в РНР?');
        $question3->setRating(['Да', 'Нет']);
        $manager->persist($question3);

        $question4 = new Question();
        $question4->setSpecializationId(2);
        $question4->setGradeId(1);
        $question4->setText('Что такое рекурсия?');
        $question4->setRating(['Да', 'Нет']);
        $manager->persist($question4);

        $question5 = new Question();
        $question5->setSpecializationId(2);
        $question5->setGradeId(2);
        $question5->setText('Какие знаете принципы ООП?');
        $question5->setRating(['Наследование', 'Инкапсуляция', 'Абстракция']);
        $manager->persist($question5);

        $question6 = new Question();
        $question6->setSpecializationId(2);
        $question6->setGradeId(2);
        $question6->setText('Какая система типов используется в PHP? Опишите плюсы и минусы.');
        $question6->setRating(['Плюс', 'Минус']);
        $manager->persist($question6);

        $manager->flush();
    }
}
