<?php

namespace App\Entity;

use App\Repository\QualificationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QualificationRepository::class)]
class Qualification
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime_immutable')]
    private ?\DateTimeImmutable $created_at;

    #[ORM\Column(type: 'integer')]
    private ?int $specialization_id;

    #[ORM\Column(type: 'integer')]
    private ?int $grade_id;

    #[ORM\Column(type: 'array')]
    private $questions = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): self
    {
        $this->created_at = $created_at;

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

    public function getQuestions(): ?array
    {
        return $this->questions;
    }

    public function setQuestions(array $questions): self
    {
        $this->questions = $questions;

        return $this;
    }
}
