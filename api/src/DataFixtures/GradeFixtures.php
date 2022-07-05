<?php

namespace App\DataFixtures;

use App\Entity\Grade;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GradeFixtures extends Fixture
{
	public const GRADES = [
		'grade1' => 'Junior Start',
		'grade2' => 'Junior Full',
		'grade3' => 'Middle Start',
		'grade4' => 'Middle Progressive',
		'grade5' => 'Middle Full',
		'grade6' => 'Senior Start',
		'grade7' => 'Senior Full',
	];

	public const GRADES_DESCRIPTION = [
		'grade1' => 'Способен самостоятельно писать свой код, понимает принципы работы программ, может разобраться в чужом коде, успешно справляется с простыми задачами, а при помощи ментора может принять участие и в решении средних по сложности задач.',
		'grade2' => 'Имеет определнный опыт достаточный для того, чтобы выполнять какие-то задачи самостоятельно. Требует меньше контроля со стороны наставника',
		'grade3' => 'Разработчик, способный самостоятельно выполнять сложные задачи. Имеет достаточно опыта и знаний, чтобы делать ревью и проверять код на ошибки.',
		'grade4' => 'Способен работать в команде, принимая участие в решении задач. Понимает как решать бизнес задачи.',
		'grade5' => 'Обладает хороший уровень soft скиллов, может взять на себя роль наставника.',
		'grade6' => 'Разработчик имеет сильные hard скиллы, может с легкостью добавить новый функционал в проект. Активно влияет на процесс приоритезации задач, а также активно взаимодействует с другими командами (в том числе командами мэнеджеров, аналитиков и т.д.)',
		'grade7' => 'Обладает сильными soft скиллами, активно влияет на атмосферу в команде, руководит процессов разработки.',
	];

    public function load(ObjectManager $manager): void
    {
		foreach (self::GRADES as $key => $value) {
			$grade = new Grade();
			$grade->setName($value);
			$grade->setDescription(self::GRADES_DESCRIPTION[$key]);
			$manager->persist($grade);
			$this->addReference($key, $grade);
		}

        $manager->flush();
    }
}
