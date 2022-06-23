<?php

namespace App\Entity;

use App\Repository\ReviewRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime')]
    private $date_start;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $date_end;

	#[ORM\ManyToOne(targetEntity: User::class)]
	#[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    private $user;

    #[ORM\Column(type: 'array', nullable: true)]
    private $respondents = [];

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $self_review;

	#[ORM\ManyToOne(targetEntity: Specialization::class)]
	#[ORM\JoinColumn(name: "specialization_id", referencedColumnName: "id")]
	private $specialization;

	#[ORM\ManyToOne(targetEntity: Grade::class)]
	#[ORM\JoinColumn(name: "grade_id", referencedColumnName: "id")]
    private $grade;

    #[ORM\Column(type: 'string', length: 255)]
    private $status = null;

    #[ORM\Column(type: 'array')]
    private $history = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateStart(): ?\DateTimeInterface
    {
        return $this->date_start;
    }

    public function setDateStart(\DateTimeInterface $date_start): self
    {
        $this->date_start = $date_start;

        return $this;
    }

    public function getDateEnd(): ?\DateTimeInterface
    {
        return $this->date_end;
    }

    public function setDateEnd(?\DateTimeInterface $date_end): self
    {
        $this->date_end = $date_end;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getRespondents(): ?array
    {
        return $this->respondents;
    }

    public function setRespondents(?array $respondents): self
    {
        $this->respondents = $respondents;

        return $this;
    }

    public function getSelfReview(): ?string
    {
        return $this->self_review;
    }

    public function setSelfReview(?string $self_review): self
    {
        $this->self_review = $self_review;

        return $this;
    }

	public function getSpecialization(): Specialization
	{
		return $this->specialization;
	}

	public function setSpecialization(Specialization $specialization): self
	{
		$this->specialization = $specialization;

		return $this;
	}

	public function getGrade(): Grade
	{
		return $this->grade;
	}

	public function setGrade(Grade $grade): self
	{
		$this->grade = $grade;

		return $this;
	}

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getHistory(): ?array
    {
        return $this->history;
    }

	public function addHistory($historyItem): self
	{
		$this->history[] = $historyItem;

		return $this;
	}

    public function setHistory(array $history): self
    {
        $this->history = $history;

        return $this;
    }
}
