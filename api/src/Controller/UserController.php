<?php

namespace App\Controller;

use App\Entity\Qualification;
use App\Entity\User;
use App\Repository\GradeRepository;
use App\Repository\SpecializationRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AppController
{
	#[Route('/api/users', name: 'get_user_list', methods: ['GET'])]
	public function get_users(UserRepository $userRepository): Response
	{
		try {
			$users = $this->jsonSerialize($userRepository->findAllExcept($this->getUser()), ['user-full', 'qualification-default', 'spec-default', 'grade-default']);
			return $this->response($users, Response::HTTP_OK);
		} catch (\Exception $e) {
			$data = [
				'status' => Response::HTTP_BAD_REQUEST,
				'errors' => $e->getMessage(),
			];
			return $this->response($data, Response::HTTP_BAD_REQUEST);
		}
	}

    #[Route('/api/user', name: 'get_user_info_by_token', methods: ['GET'])]
    public function get_user(): Response
    {
        try {
            $user = $this->getUser();
			$data = $this->jsonSerialize($user, ['user-full', 'qualification-default', 'spec-default', 'grade-default']);
            return $this->response($data);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];
            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

	#[Route('/api/user/{id}', name: 'get_user_info_by_id', methods: ['GET'])]
	public function get_user_info(UserRepository $userRepository, $id): Response
	{
		try {
			$user = $userRepository->find($id);
			$data = $this->jsonSerialize($user, ['user-full', 'qualification-default', 'spec-default', 'grade-default']);
			return $this->response($data);
		} catch (\Exception $e) {
			$data = [
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'errors' => $e->getMessage(),
			];
			return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}

    #[Route('/api/user', name: 'create_user', methods: ['POST'])]
	public function create_user(
		Request $request,
	    SpecializationRepository $specializationRepository,
		GradeRepository $gradeRepository,
		UserRepository $userRepository,
	    EntityManagerInterface $entityManager): Response
	{
		try {
			$request = $this->transformJsonBody($request);
			$email = $request->get('email');

			if ($userRepository->findBy(['email' => $email])) {
				return $this->response([
					'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
					'errors' => 'Пользователь с таким email уже существует',
				], Response::HTTP_UNPROCESSABLE_ENTITY);
			}

			$user = new User();
			$user->setEmail($email);
			$user->setPassword($request->get('password'));
			$user->setFullName($request->get('fullName'));
			$role = $request->get('role');
			if ($role !== 'ROLE_USER') {
				$user->setRoles([$role]);
			}

			$specialization = $specializationRepository->find($request->get('specialization'));
			$grade = $gradeRepository->find($request->get('grade'));

			if (!$specialization->getGrades()->contains($grade)) {
				return $this->response([
					'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
					'errors' => 'Такого грейда не существует в этой специализации',
				], Response::HTTP_UNPROCESSABLE_ENTITY);
			}

			$qualification = new Qualification();
			$qualification->setSpecialization($specialization);
			$qualification->setGrade($grade);
			$entityManager->persist($qualification);

			$user->addQualification($qualification);

			$entityManager->persist($user);
			$entityManager->flush();

			return $this->response([
				'status' => Response::HTTP_CREATED,
				'data' => 'Пользователь успешно создан',
			], Response::HTTP_CREATED);
		} catch (\Exception $e) {
			$data = [
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'errors' => $e->getMessage(),
			];
			return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}

	#[Route('/api/user/{id}', name: 'update_user', methods: ['PUT'])]
	public function update_user(Request $request, UserRepository $userRepository, $id): Response
	{
		try {
//			$data = $request->request->all();
//			$user = $userRepository->find($id);
//			$userRepository->updateUser($user, $data);
//			$data = $this->jsonSerialize($user);
			return $this->response([
				'status' => Response::HTTP_OK,
				'message' => 'Пользователь успешно обновлен',
			], Response::HTTP_OK);
		} catch (\Exception $e) {
			$data = [
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'message' => $e->getMessage(),
			];
			return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}

	#[Route('/api/user/{id}', name: 'delete_user', methods: ['DELETE'])]
	public function delete_user(UserRepository $userRepository, $id): Response
	{
		try {
			$user = $userRepository->find($id);
			$userRepository->deleteUser($user);
			return $this->response(null, Response::HTTP_OK);
		} catch (\Exception $e) {
			$data = [
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'errors' => $e->getMessage(),
			];
			return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}
}
