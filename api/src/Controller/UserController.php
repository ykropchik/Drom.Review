<?php

namespace App\Controller;

use App\Entity\Qualification;
use App\Repository\GradeRepository;
use App\Repository\SpecializationRepository;
use App\Repository\UserQualificationRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AppController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

	#[Route('/api/users', name: 'get_user_list', methods: ['GET'])]
	public function get_users(UserRepository $userRepository): Response
	{
		try {
			$users = $this->jsonSerialize($userRepository->findAll(), ['grades']);
			return $this->response($users, Response::HTTP_OK);
		} catch (\Exception $e) {
			$data = [
				'status' => Response::HTTP_BAD_REQUEST,
				'errors' => $e->getMessage(),
			];
			return $this->response($data, Response::HTTP_BAD_REQUEST);
		}
	}

    #[Route('/api/user', name: 'get_user_info', methods: ['GET'])]
    public function get_user(): Response
    {
        try {
            $user = $this->getUser();
			$data = $this->jsonSerialize($user);
            return $this->response($data);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];
            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

	#[Route('/api/user/{id}', name: 'get_user_info', methods: ['GET'])]
	public function get_user_info(UserRepository $userRepository, $id): Response
	{
		try {
			$user = $userRepository->find($id);
			$data = $this->jsonSerialize($user);
			return $this->response($data);
		} catch (\Exception $e) {
			$data = [
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'errors' => $e->getMessage(),
			];
			return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}

    #[Route('/api/user/qualification', name: 'add_users_qualification', methods: ['POST'])]
    public function add_users_qualification(
		Request $request,
		SpecializationRepository $specializationRepository,
		GradeRepository $gradeRepository
    ): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$specializationRepository->find($request->get('specialization_id'))) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'Специалиазация с таким id не найдена',
                ];
            } elseif (!$gradeRepository->find($request->get('grade_id'))) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'Грейд с таким id не найден',
                ];
            }
			else {
                $user = $this->getUser();
				$grade = $gradeRepository->find($request->get('grade_id'));
				$specialization = $specializationRepository->find($request->get('specialization_id'));

                $users_qualification = new Qualification();
                $users_qualification->setSpecialization($specialization);
                $users_qualification->setGrade($grade);

                $this->entityManager->persist($users_qualification);
                $this->entityManager->flush();

				$user->addQualification($users_qualification);

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Квалификация успешно добавлена',
                ];
            }

            return $this->response($data);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];
            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
