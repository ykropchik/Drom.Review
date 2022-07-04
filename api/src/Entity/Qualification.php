<?php

namespace App\Entity;

use App\Repository\UserQualificationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserQualificationRepository::class)]
class Qualification
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['qualification-default'])]
    private $id;

    #[ORM\ManyToOne(targetEntity: Specialization::class)]
    #[ORM\JoinColumn(name: "specialization_id", referencedColumnName: "id")]
    #[Groups(['qualification-default'])]
    private $specialization;

	#[ORM\ManyToOne(targetEntity: Grade::class)]
	#[ORM\JoinColumn(name: "grade_id", referencedColumnName: "id")]
	#[Groups(['qualification-default'])]
	private $grade;

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
}
