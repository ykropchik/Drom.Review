<?php

namespace App\Entity;

use App\Repository\SpecializationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SpecializationRepository::class)]
class Specialization
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

	/**
	 * Many Users have Many Groups.
	 * @ManyToMany(targetEntity="Grade")
	 * @JoinTable(
	 *     name="specialization_grades",
	 *     joinColumns={},
	 *     inverseJoinColumns={@JoinColumn(name="grades_id", referencedColumnName="id")}
	 *     )
	 */
	#[ORM\ManyToMany(targetEntity: Grade::class)]
	#[ORM\JoinTable(
		name: 'specialization_grades',
		joinColumns: [new ORM\JoinColumn(name: "specialization_id", referencedColumnName: "id")],
		inverseJoinColumns: [new ORM\JoinColumn(name: "grades_id", referencedColumnName: "id")]
	)]
	private $grades;

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

	public function getGrades(): ?array
	{
		return $this->grades;
	}

	public function setGrades(array $grades): self
	{
		$this->grades = $grades;

		return $this;
	}
}
