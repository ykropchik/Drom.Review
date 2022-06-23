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

    #[ORM\Column(type: 'datetime')]
    private $date_start;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $date_end;

	#[ORM\ManyToOne(targetEntity: User::class)]
	#[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    private $user;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $self_review;

    #[ORM\Column(type: 'array')]
    private $qualification = [];

    #[ORM\Column(type: 'string', length: 255)]
    private $status = null;

    #[ORM\Column(type: 'array')]
    private $history = [];

    #[ORM\OneToMany(mappedBy: 'review', targetEntity: Respondent::class)]
    private $respondents;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'qualifications')]
    private $subject;

    public function __construct()
    {
        $this->respondents = new ArrayCollection();
    }

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

    public function getSelfReview(): ?string
    {
        return $this->self_review;
    }

    public function setSelfReview(?string $self_review): self
    {
        $this->self_review = $self_review;

        return $this;
    }

    public function getQualification(): ?array
    {
        return $this->qualification;
    }

    public function setQualification(array $qualification): self
    {
        $this->qualification = $qualification;

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

    public function setHistory(array $history): self
    {
        $this->history = $history;

        return $this;
    }

    /**
     * @return Collection<int, Respondent>
     */
    public function getRespondents(): Collection
    {
        return $this->respondents;
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
        if ($this->respondents->removeElement($respondent)) {
            // set the owning side to null (unless already changed)
            if ($respondent->getReview() === $this) {
                $respondent->setReview(null);
            }
        }

        return $this;
    }

    public function getSubject(): ?User
    {
        return $this->subject;
    }

    public function setSubject(?User $subject): self
    {
        $this->subject = $subject;

        return $this;
    }
}
