<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['user-default', 'user-full'])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['user-default', 'user-full'])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(['user-default', 'user-full'])]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['user-default', 'user-full'])]
    private $fullName;

	#[ORM\ManyToMany(targetEntity: Qualification::class)]
	#[ORM\JoinTable(
		name: 'user_qualifications',
		joinColumns: [new ORM\JoinColumn(name: "user_id", referencedColumnName: "id")],
		inverseJoinColumns: [new ORM\JoinColumn(name: "qualification_id", referencedColumnName: "id")]
	)]
	#[Groups(['user-full'])]
    private $qualifications;

    public function __construct()
    {
        $this->qualifications = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): self
    {
        $this->fullName = $fullName;

        return $this;
    }

    /**
     * @return Collection<int, Qualification>
     */
    public function getQualifications(): Collection
    {
        return $this->qualifications;
    }

    public function addQualification(Qualification $qualification): self
    {
        if (!$this->qualifications->contains($qualification)) {
            $this->qualifications[] = $qualification;
        }

        return $this;
    }

    public function removeQualification(Qualification $qualification): self
    {
	    $this->qualifications->removeElement($qualification);

        return $this;
    }
}
