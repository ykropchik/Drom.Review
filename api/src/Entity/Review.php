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

    #[ORM\Column(type: 'integer')]
    private $user_id;

    #[ORM\Column(type: 'array', nullable: true)]
    private $respondents = [];

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $self_review;

    #[ORM\Column(type: 'array')]
    private $qualification = [];

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

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): self
    {
        $this->user_id = $user_id;

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
}
