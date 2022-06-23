<?php

namespace App\Controller;

use App\Entity\Review;
use App\Repository\GradeRepository;
use App\Repository\ReviewRepository;
use App\Repository\SpecializationRepository;
use App\Repository\UserQualificationRepository;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReviewController extends AppController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/review', name: 'initialize_review', methods: ['POST'])]
    public function initialize_review(
		Request $request,
	    UserRepository $userRepository,
		SpecializationRepository $specializationRepository,
		GradeRepository $gradeRepository,
		UserQualificationRepository $userQualificationRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);
			$user = $userRepository->find($request->get('user_id'));

            if (!$user) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Отсутствует пользователь с таким id',
                ];
            } else {
				$specialization = $specializationRepository->find($request->get('specialization_id'));
				$specializationGrades = $specialization->getGrades();
				$grade = $gradeRepository->find($request->get('grade_id'));

				if(!$specializationGrades->contains($grade)) {
					return $this->response([
						'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
						'errors' => 'У выбранной специализации отсутствует грейд с таким id',
					]);
				}

                $review = new Review();
                $review->setUser($user);
                $review->setDateStart(new DateTime());
				$review->setSpecialization($specialization);
				$review->setGrade($grade);
                $review->setStatus('self_review');

                $history = [];
                $current_time = new DateTime();
                $history[] = [
	                'user' => $this->getUser(),
	                'comment' => null,
	                'created_at' => $current_time->getTimestamp()
                ];
                $review->setHistory($history);

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Review успешно инициализирован',
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

    #[Route('/api/review', name: 'get_reviews', methods: ['GET'])]
    public function get_reviews(Request $request, ReviewRepository $reviewRepository, UserRepository $userRepository, SpecializationRepository $specializationRepository, GradeRepository $gradeRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if ($request->get('type') == 'all') {
                $reviews = $reviewRepository->findAll();

                $data = $this->jsonSerialize($reviews);
            } else {
				$ownReviews = $reviewRepository->findBy(['user' => $this->getUser()]);
				$data = $this->jsonSerialize($ownReviews);
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

    #[Route('/api/review/status/{id}', name: 'set_review_status', methods: ['PUT'])]
    public function set_review_status(Request $request, ReviewRepository $reviewRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$reviewRepository->find($id)) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Отсутствует review с таким id',
                ];
            } elseif (!$request->get('status')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Не указан статус',
                ];
            } else {
                $review = $reviewRepository->find($id);
                $review->setStatus($request->get('status'));

                $review->addHistory(
					[
		                'user' => ['email' => $this->getUser()->getEmail(), 'full_name' => $this->getUser()->getFullName()],
		                'comment' => 'Смена статуса: ' . $request->get('status'),
		                'created_at' => (new DateTime())->getTimestamp()
					]
                );

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Статус успешно изменен',
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

    #[Route('/api/review/comment/{id}', name: 'add_review_comment', methods: ['PUT'])]
    public function add_review_comment(Request $request, ReviewRepository $reviewRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);
            $user = $this->getUser();

            if (!$reviewRepository->find($id)) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Review с таким id не найден',
                ];
            } elseif (!$request->get('comment')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Не указан комментарий',
                ];
            } else {
                $review = $reviewRepository->find($id);
                $review->addHistory(
	                [
		                'user' => ['email' => $user->getEmail(), 'full_name' => $user->getFullName()],
		                'comment' => $request->get('comment'),
		                'created_at' => (new DateTime())->getTimestamp()
	                ]
                );

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Комментарий успешно добавлен',
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

    #[Route('/api/review/self-review/{id}', name: 'add_self_review', methods: ['PUT'])]
    public function add_self_review(Request $request, ReviewRepository $reviewRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$reviewRepository->find($id)) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Review с таким id не найден',
                ];
            } elseif (!$request->get('self_review')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Self review не указан',
                ];
            } else {
                $review = $reviewRepository->find($id);
                $review->setSelfReview($request->get('self_review'));

                $review->addHistory(
	                [
		                'user' => ['email' => $this->getUser()->getEmail(), 'full_name' => $this->getUser()->getFullName()],
		                'comment' => 'Добавлено новое self-review',
		                'created_at' => (new DateTime())->getTimestamp()
	                ]
                );

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Self-review успешно добавлен',
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
