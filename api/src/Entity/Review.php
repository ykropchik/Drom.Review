<?php

namespace App\Entity;

use App\Repository\ReviewRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    private $date_start;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $date_end;

	#[ORM\ManyToOne(targetEntity: User::class)]
	#[ORM\JoinColumn(name: "subject_id", referencedColumnName: "id")]
    private $subject;

	#[ORM\ManyToOne(targetEntity: User::class)]
	#[ORM\JoinColumn(name: "lead_id", referencedColumnName: "id")]
	private $lead;

	#[ORM\ManyToMany(targetEntity: Respondent::class)]
	#[ORM\JoinTable(
		name: 'review_respondents',
		joinColumns: [new ORM\JoinColumn(name: "review_id", referencedColumnName: "id")],
		inverseJoinColumns: [new ORM\JoinColumn(name: "respondent_id", referencedColumnName: "id")]
	)]
    private $respondents;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $self_review;

	#[ORM\ManyToOne(targetEntity: Specialization::class)]
	#[ORM\JoinColumn(name: "specialization_id", referencedColumnName: "id")]
	private $specialization;

	#[ORM\ManyToOne(targetEntity: Grade::class)]
	#[ORM\JoinColumn(name: "grade_id", referencedColumnName: "id")]
    private $grade;

	/**
	 * @var string @see App\Types\ReviewStatus
	 */
    #[ORM\Column(type: 'string', length: 255)]
    private string $status = 'init';

	/**
	 * @var array [ 'action' => @see ReviewActions, 'created_at' => 'date_time', 'comment' => null | string, 'author' => User ]
	 */
    #[ORM\Column(type: 'array')]
    private $history = [];

	public function __construct()
	{
		$this->respondents = new ArrayCollection();
	}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateStart(): ?int
    {
        return $this->date_start;
    }

    public function setDateStart(int $date_start): self
    {
        $this->date_start = $date_start;

        return $this;
    }

    public function getDateEnd(): ?int
    {
        return $this->date_end;
    }

    public function setDateEnd(int $date_end): self
    {
        $this->date_end = $date_end;

        return $this;
    }

    public function getSubject(): ?User
    {
        return $this->subject;
    }

    public function setSubject(User $subject): self
    {
        $this->subject = $subject;

        return $this;
    }

	public function getLead(): ?User
	{
		return $this->lead;
	}

	public function setLead(User $lead): self
	{
		$this->lead = $lead;

		return $this;
	}

	/**
	 * @return Collection<int, Respondent>
	 */
	public function getRespondents(): Collection
	{
		return $this->respondents;
	}

	public function setRespondents(array $respondents): self
	{
		foreach ($respondents as $respondent) {
			$this->addRespondent($respondent);
		}

		return $this;
	}

	public function addRespondent(Respondent $respondent): self
	{
		if (!$this->respondents->contains($respondent)) {
			$this->respondents[] = $respondent;
		}

		return $this;
	}

	public function removeRespondent(Respondent $respondent): self
	{
		$this->respondents->removeElement($respondent);

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
