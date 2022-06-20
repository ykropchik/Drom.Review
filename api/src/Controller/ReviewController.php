<?php

namespace App\Controller;

use App\Entity\Review;
use App\Repository\GradeRepository;
use App\Repository\ReviewRepository;
use App\Repository\SpecializationGradesRepository;
use App\Repository\SpecializationRepository;
use App\Repository\UserQualificationRepository;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
    public function initialize_review(Request $request, UserRepository $userRepository, SpecializationRepository $specializationRepository, SpecializationGradesRepository $specializationGradesRepository, UserQualificationRepository $userQualificationRepository): Response
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
            } elseif (!$specializationGradesRepository->findBy(['specialization_id' => $request->get('specialization_id'), 'grade_id' => $request->get('grade_id')])) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'No grade with this id in given specialization',
                ];
            } elseif (!$userQualificationRepository->findBy(['user_id' => $request->get('user_id'), 'specialization_id' => $request->get('specialization_id'), 'grade_id' => $request->get('grade_id')])) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'This user have not this qualification',
                ];
            } else {
                $review = new Review();
                $review->setUserId($request->get('user_id'));
                $review->setDateStart(new DateTime());
                $review->setQualification(['specialization_id' => $request->get('specialization_id'), 'grade_id' => $request->get('grade_id')]);
                $review->setStatus(['user' => null, 'status' => 'self_review', 'comment' => null]);

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
                    $temp_question = [
                        'id' => $review->getId(),
                        'date_start' => $review->getDateStart(),
                        'date_end' => $review->getDateEnd(),
                        'subject' => ['id' => $user->getId(), 'email' => $user->getEmail(), 'full_name' => $user->getFullName()],
                        'self_review' => $review->getSelfReview(),
                        'qualification' => [
                            'specialization' => ['id' => $specialization->getId(), 'name' => $specialization->getName()],
                            'grade' => ['id' => $grade->getId(), 'name' => $grade->getName(), 'description' => $grade->getDescription()]],
                        'status' => ['status' => $review->getStatus()['status']]

                    ];
                    array_push($data, $temp_question);
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

    #[Route('/api/review/status/{id}', name: 'set_review_status', methods: ['POST'])]
    public function set_review_status(Request $request, ReviewRepository $reviewRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$reviewRepository->find($id)) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'No review with this id',
                ];
            } elseif (!$request->get('user') or !$request->get('status') or !$request->get('comment')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Unprocessable entity',
                ];
            } else {
                $review = $reviewRepository->find($id);
                $review->setStatus(['user' => $request->get('user'), 'status' => $request->get('status'), 'comment' => $request->get('comment')]);

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
}
