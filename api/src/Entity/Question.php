<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['question-default', 'question-full'])]
    private $id;

    #[ORM\Column(type: 'string', length: 1024)]
    #[Groups(['question-default', 'question-full'])]
    private $text;

    #[ORM\Column(type: 'array')]
    #[Groups(['question-default', 'question-full'])]
    private $rating = [];

	#[ORM\ManyToOne(targetEntity: Specialization::class)]
	#[ORM\JoinColumn(name: "specialization_id", referencedColumnName: "id")]
	#[Groups(['question-full'])]
    private $specialization;

	#[ORM\ManyToOne(targetEntity: Grade::class)]
	#[ORM\JoinColumn(name: "grade_id", referencedColumnName: "id")]
	#[Groups(['question-full'])]
    private $grade;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getRating(): ?array
    {
        return $this->rating;
    }

    public function setRating(array $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getSpecialization(): ?Specialization
    {
        return $this->specialization;
    }

    public function setSpecialization(Specialization $specialization): self
    {
        $this->specialization = $specialization;

        return $this;
    }

    public function getGrade(): ?Grade
    {
        return $this->grade;
    }

    public function setGrade(Grade $grade): self
    {
        $this->grade = $grade;

        return $this;
    }
}
