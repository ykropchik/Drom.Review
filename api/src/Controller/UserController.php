<?php

namespace App\Controller;

use App\Entity\UserQualification;
use App\Repository\GradeRepository;
use App\Repository\SpecializationGradesRepository;
use App\Repository\SpecializationRepository;
use App\Repository\UserQualificationRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

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
			$users = $this->jsonSerialize(
				$userRepository->findAll(),
				['password', 'userIdentifier', 'user']
			);
			return $this->response(json_decode($users), Response::HTTP_OK);
		} catch (\Exception $e) {
			$data = [
				'status' => Response::HTTP_BAD_REQUEST,
				'errors' => $e->getMessage(),
			];
			return $this->response($data, Response::HTTP_BAD_REQUEST);
		}
	}

    #[Route('/api/user', name: 'get_user_info', methods: ['GET'])]
    public function get_user(UserQualificationRepository $qualificationRepository, SpecializationRepository $specializationRepository, GradeRepository $gradeRepository): Response
    {
        try {
            $user = $this->getUser();

            $data = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'full_name' => $user->getFullName(),
                'qualifications' => []
            ];

            foreach ($qualificationRepository->findBy(['user_id' => $user->getId()]) as $qualification) {
                $specialization = $specializationRepository->find($qualification->getSpecializationId());
                $grade = $gradeRepository->find($qualification->getGradeId());
                array_push($data['qualifications'], ['specialization' => $specialization->getName(), 'grade' => ['name' => $grade->getName(), 'description' => $grade->getDescription()]]);
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

    #[Route('/api/user/qualification', name: 'add_users_qualification', methods: ['POST'])]
    public function add_users_qualification(Request $request, SpecializationRepository $specializationRepository, GradeRepository $gradeRepository, SpecializationGradesRepository $specializationGradesRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$specializationRepository->find($request->get('specialization_id'))) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'No specialization with this id',
                ];
            } elseif (!$gradeRepository->find($request->get('grade_id'))) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'No grade with this id',
                ];
            } elseif (!$specializationGradesRepository->findBy(['specialization_id' => $request->get('specialization_id'), 'grade_id' => $request->get('grade_id')])) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'No grade with this id in given specialization',
                ];
            } else {
                $user = $this->getUser();

                $users_qualification = new UserQualification();
                $users_qualification->setSpecializationId($request->get('specialization_id'));
                $users_qualification->setGradeId($request->get('grade_id'));

                $this->entityManager->persist($users_qualification);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'User\'s qualification added successfully',
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
