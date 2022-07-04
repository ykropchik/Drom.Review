<?php

namespace App\Entity;

use App\Repository\RespondentRepository;
use App\Types\RespondentStatus;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RespondentRepository::class)]
class Respondent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['respondent-default', 'respondent-full', 'respondent-invite'])]
    private $id;

	#[ORM\ManyToOne(targetEntity: Review::class)]
	#[ORM\JoinColumn(name: "review_id", referencedColumnName: "id")]
	#[Groups(['respondent-full', 'respondent-invite'])]
	private $review;

	#[ORM\ManyToOne(targetEntity: User::class)]
	#[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
	#[Groups(['respondent-default', 'respondent-full', 'respondent-invite'])]
    private $user;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $comment;

    #[ORM\Column(type: 'string', length: 20)]
    #[Groups(['respondent-default', 'respondent-full', 'respondent-invite'])]
    private $status = RespondentStatus::INACTIVE;

	#[ORM\ManyToMany(targetEntity: Opinion::class, orphanRemoval: true)]
//	#[ORM\JoinColumn(name: "opinion_id", referencedColumnName: "id")]
	#[ORM\JoinTable(
		name: 'respondent_opinions',
		joinColumns: [new ORM\JoinColumn(name: "respondent_id", referencedColumnName: "id")],
		inverseJoinColumns: [new ORM\JoinColumn(name: "opinion_id", referencedColumnName: "id", onDelete: 'CASCADE')]
	)]
	#[Groups(['respondent-full'])]
    private $opinions;

	public function __construct() {
		$this->opinions = new ArrayCollection();
	}

    public function getId(): ?int
    {
        return $this->id;
    }

	public function getReview(): Review
	{
		return $this->review;
	}

	public function setReview(Review $review): self
	{
		$this->review = $review;

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

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

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

    public function getOpinions(): Collection
    {
        return $this->opinions;
    }

	public function addOpinion(Opinion $opinion): self
	{
		if (!$this->opinions->contains($opinion)) {
			$this->opinions[] = $opinion;
		}
		return $this;
	}
}
