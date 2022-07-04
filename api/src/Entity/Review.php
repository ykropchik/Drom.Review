<?php

namespace App\Entity;

use App\Repository\ReviewRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['review-default', 'review-full'])]
    private $id;

    #[ORM\Column(type: 'integer')]
    #[Groups(['review-default', 'review-full'])]
    private $dateStart;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['review-default', 'review-full'])]
    private $dateEnd;

	#[ORM\ManyToOne(targetEntity: User::class)]
	#[ORM\JoinColumn(name: "subject_id", referencedColumnName: "id")]
	#[Groups(['review-default', 'review-full', 'respondent-full'])]
    private $subject;

	#[ORM\ManyToOne(targetEntity: User::class)]
	#[ORM\JoinColumn(name: "lead_id", referencedColumnName: "id")]
	#[Groups(['review-default', 'review-full'])]
	private $lead;

	#[ORM\OneToMany(mappedBy: "review", targetEntity: Respondent::class, orphanRemoval: true)]
//	#[ORM\JoinTable(
//		name: 'review_respondents',
//		joinColumns: [new ORM\JoinColumn(name: "review_id", referencedColumnName: "id")],
//		inverseJoinColumns: [new ORM\JoinColumn(name: "respondent_id", referencedColumnName: "id", onDelete: 'CASCADE')]
//	)]]
	#[Groups(['review-full'])]
    private $respondents;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['review-full'])]
    private $selfReview;

	#[ORM\ManyToOne(targetEntity: Specialization::class)]
	#[ORM\JoinColumn(name: "specialization_id", referencedColumnName: "id")]
	#[Groups(['review-default', 'review-full', 'respondent-full', 'respondent-invite'])]
	private $specialization;

	#[ORM\ManyToOne(targetEntity: Grade::class)]
	#[ORM\JoinColumn(name: "grade_id", referencedColumnName: "id")]
	#[Groups(['review-default', 'review-full', 'respondent-full', 'respondent-invite'])]
    private $grade;

	/**
	 * @var string @see App\Types\HistoryItem
	 */
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['review-default', 'review-full'])]
    private string $status = 'init';

	/**
	 * @var array [ 'action' => @see ReviewActions, 'created_at' => 'date_time', 'comment' => null | string, 'author' => User ]
	 */
    #[ORM\Column(type: 'array')]
    #[Groups(['review-full'])]
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
        return $this->dateStart;
    }

    public function setDateStart(int $dateStart): self
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    public function getDateEnd(): ?int
    {
        return $this->dateEnd;
    }

    public function setDateEnd(int $dateEnd): self
    {
        $this->dateEnd = $dateEnd;

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
			$respondent->setReview($this);
		}

		return $this;
	}

	public function removeRespondent(Respondent $respondent): self
	{
		$this->respondents->removeElement($respondent);

		return $this;
	}

	public function removeRespondents(): self
	{
		foreach ($this->respondents as $respondent) {
			$this->removeRespondent($respondent);
		}

		return $this;
	}

    public function isRespondent(int $userId): bool
    {
        $respondents = $this->getRespondents();
        foreach ($respondents as $respondent) {
            if ($respondent->getUser()->getId() == $userId) {
                return true;
            }
        }
        return false;
    }

    public function getSelfReview(): ?string
    {
        return $this->selfReview;
    }

    public function setSelfReview(?string $selfReview): self
    {
        $this->selfReview = $selfReview;

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
