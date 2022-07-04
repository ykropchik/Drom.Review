<?php

namespace App\Entity;

use App\Repository\OpinionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OpinionRepository::class)]
class Opinion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['opinion-default'])]
    private $id;

    #[ORM\ManyToOne(targetEntity: Question::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['opinion-default'])]
    private $question;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['opinion-default'])]
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
