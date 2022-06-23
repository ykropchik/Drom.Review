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
		UserQualificationRepository $userQualificationRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$userRepository->find($request->get('user_id'))) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'No user with this id',
                ];
            } elseif (!$specializationRepository->find($request->get('specialization_id'))) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'No specialization with this id',
                ];
            }
//			elseif (!$specializationGradesRepository->findBy(['specialization_id' => $request->get('specialization_id'), 'grade_id' => $request->get('grade_id')])) {
//                $data = [
//                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
//                    'errors' => 'No grade with this id in given specialization',
//                ];
//            }
			elseif (!$userQualificationRepository->findBy(['user_id' => $request->get('user_id'), 'specialization_id' => $request->get('specialization_id'), 'grade_id' => $request->get('grade_id')])) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'This user have not this qualification',
                ];
            } else {
                $review = new Review();
                $review->setSubject($userRepository->find($request->get('user_id')));
                $review->setDateStart(new DateTime());
                $review->setQualification(['specialization_id' => $request->get('specialization_id'), 'grade_id' => $request->get('grade_id')]);
                $review->setStatus('self_review');

                $history = [];
                $current_time = new DateTime();
                array_push($history, [
                    'user' => ['email' => $this->getUser()->getEmail(), 'full_name' => $this->getUser()->getFullName()],
                    'comment' => 'Создание ревью',
                    'created_at' => $current_time->format('Y M d H:i:s')]);
                $review->setHistory($history);

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Review initialized successfully',
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

                $data = [];

                foreach ($reviews as $review) {
                    $user = $userRepository->find($review->getUserId());
                    $specialization = $specializationRepository->find($review->getQualification()['specialization_id']);
                    $grade = $gradeRepository->find($review->getQualification()['grade_id']);
                    $temp_review = [
                        'id' => $review->getId(),
                        'date_start' => $review->getDateStart()->format('Y M d H:i:s'),
                        'date_end' => $review->getDateEnd()?->format('Y M d H:i:s'),
                        'subject' => ['id' => $user->getId(), 'email' => $user->getEmail(), 'full_name' => $user->getFullName()],
                        'self_review' => $review->getSelfReview(),
                        'qualification' => [
                            'specialization' => ['id' => $specialization->getId(), 'name' => $specialization->getName()],
                            'grade' => ['id' => $grade->getId(), 'name' => $grade->getName(), 'description' => $grade->getDescription()]],
                        'status' => $review->getStatus(),
                        'history' => $review->getHistory()

                    ];
                    array_push($data, $temp_review);
                }
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
                    'errors' => 'No review with this id',
                ];
            } elseif (!$request->get('status')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Unprocessable entity',
                ];
            } else {
                $review = $reviewRepository->find($id);
                $review->setStatus($request->get('status'));

                $history = $review->getHistory();
                $current_time = new DateTime();
                array_push($history, [
                    'user' => ['email' => $this->getUser()->getEmail(), 'full_name' => $this->getUser()->getFullName()],
                    'comment' => 'Смена статуса: ' . $request->get('status'),
                    'created_at' => $current_time->format('Y M d H:i:s')]);
                $review->setHistory($history);

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Review status updated successfully',
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
                    'errors' => 'No review with this id',
                ];
            } elseif (!$request->get('comment')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Unprocessable entity',
                ];
            } else {
                $review = $reviewRepository->find($id);
                $history = $review->getHistory();
                $current_time = new DateTime();
                array_push($history, [
                    'user' => ['email' => $user->getEmail(), 'full_name' => $user->getFullName()],
                    'comment' => $request->get('comment'),
                    'created_at' => $current_time->format('Y M d H:i:s')]);
                $review->setHistory($history);

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Review commented successfully',
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
                    'errors' => 'No review with this id',
                ];
            } elseif (!$request->get('self_review')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Unprocessable entity',
                ];
            } else {
                $review = $reviewRepository->find($id);
                $review->setSelfReview($request->get('self_review'));

                $history = $review->getHistory();
                $current_time = new DateTime();
                array_push($history, [
                    'user' => ['email' => $this->getUser()->getEmail(), 'full_name' => $this->getUser()->getFullName()],
                    'comment' => 'Добавлено новое self-review',
                    'created_at' => $current_time->format('Y M d H:i:s')]);
                $review->setHistory($history);

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Self-review added successfully',
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
