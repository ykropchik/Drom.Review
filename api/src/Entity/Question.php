<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $text;

    #[ORM\Column(type: 'array')]
    private $rating = [];

    #[ORM\Column(type: 'integer')]
    private $specialization_id;

    #[ORM\Column(type: 'integer')]
    private $grade_id;

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

    public function getSpecializationId(): ?int
    {
        return $this->specialization_id;
    }

    public function setSpecializationId(int $specialization_id): self
    {
        $this->specialization_id = $specialization_id;

        return $this;
    }

    public function getGradeId(): ?int
    {
        return $this->grade_id;
    }

    public function setGradeId(int $grade_id): self
    {
        $this->grade_id = $grade_id;

        return $this;
    }
}
