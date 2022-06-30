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
    #[ORM\JoinColumn(nullable: false)]
    private $question;

    #[ORM\Column(type: 'string', length: 255)]
    private $estimate;

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

    public function getEstimate(): ?string
    {
        return $this->estimate;
    }

    public function setEstimate(string $estimate): self
    {
        $this->estimate = $estimate;

        return $this;
    }
}
