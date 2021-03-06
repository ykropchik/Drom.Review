<?php

namespace App\Entity;

use App\Repository\SpecializationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SpecializationRepository::class)]
class Specialization
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['spec-default', 'spec-full'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['spec-default', 'spec-full'])]
    private $name;

	#[ORM\ManyToMany(targetEntity: Grade::class)]
	#[ORM\JoinTable(
		name: 'specialization_grades',
		joinColumns: [new ORM\JoinColumn(name: "specialization_id", referencedColumnName: "id")],
		inverseJoinColumns: [new ORM\JoinColumn(name: "grades_id", referencedColumnName: "id")]
	)]
	#[Groups(['spec-full'])]
	private $grades;

	#[Pure] public function __construct()
	{
		$this->grades = new ArrayCollection();
	}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

	public function getGrades(): Collection
	{
		return $this->grades;
	}

	public function addGrade(Grade $grade): self
	{
		if (!$this->grades->contains($grade)) {
			$this->grades[] = $grade;
		}

		return $this;
	}

	public function removeGrade(Grade $grade): self
	{
		if ($this->grades->contains($grade)) {
			$this->grades->removeElement($grade);
		}

		return $this;
	}

	public function setGrades(array $newGrades): self
	{
		foreach ($this->grades as $oldGrade) {
			$this->removeGrade($oldGrade);
		}

		foreach ($newGrades as $grade) {
			$this->addGrade($grade);
		}

		return $this;
	}
}
