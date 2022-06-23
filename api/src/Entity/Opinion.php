<?php

namespace App\Entity;

use App\Repository\OpinionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OpinionRepository::class)]
class Opinion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Question::class)]
    private $question;

    #[ORM\Column(type: 'string', length: 1023, nullable: true)]
    private $уы�estimate;

    #[ORM\ManyToOne(targetEntity: Respondent::class, inversedBy: 'opinions')]
    #[ORM\JoinColumn(nullable: false)]
    private $respondent;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getуы�estimate(): ?string
    {
        return $this->уы�estimate;
    }

    public function setуы�estimate(?string $уы�estimate): self
    {
        $this->уы�estimate = $уы�estimate;

        return $this;
    }

    public function getRespondent(): ?Respondent
    {
        return $this->respondent;
    }

    public function setRespondent(?Respondent $respondent): self
    {
        $this->respondent = $respondent;

        return $this;
    }
}
