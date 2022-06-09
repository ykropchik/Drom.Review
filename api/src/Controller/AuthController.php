<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AppController
{
    private EntityManagerInterface $entityManager;
    private $hasher;

    public function __construct(UserPasswordHasherInterface $hasher, EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->hasher = $hasher;
    }

    #[Route('/api/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            $user = new User();
            $user->setEmail($request->get('email'));
            $user->setPassword($this->hasher->hashPassword($user, $request->get('password')));
            $user->setFullName($request->get('full_name'));

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'User added successfully',
            ];

            return $this->response($data);
        } catch (\Exception $e) {
            if (preg_match('/(Duplicate entry)/', $e->getMessage())) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'User with this name already exist',
                ];
            } else {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => $e->getMessage(),
                ];
            }
            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
