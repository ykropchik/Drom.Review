<?php

namespace App\Entity;

use App\Repository\UserQualificationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserQualificationRepository::class)]
class UserQualification
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    private $user_id;

    #[ORM\Column(type: 'integer')]
    private $specialization_id;

    #[ORM\Column(type: 'integer')]
    private $grade_id;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): self
    {
        $this->user_id = $user_id;

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
