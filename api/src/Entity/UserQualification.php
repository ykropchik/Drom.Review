<?php

namespace App\Entity;

use App\Repository\UserQualificationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserQualificationRepository::class)]
class UserQualification
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Specialization::class)]
    #[ORM\JoinColumn(name: "specialization_id", referencedColumnName: "id")]
    private $specialization;

	#[ORM\ManyToOne(targetEntity: Grade::class)]
	#[ORM\JoinColumn(name: "grade_id", referencedColumnName: "id")]
	private $grade;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'qualifications')]
    #[ORM\JoinColumn(nullable: false)]
    private $user;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
