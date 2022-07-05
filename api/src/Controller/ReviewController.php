<?php

namespace App\Controller;

use App\Entity\Opinion;
use App\Entity\Respondent;
use App\Entity\Review;
use App\Repository\GradeRepository;
use App\Repository\QuestionRepository;
use App\Repository\RespondentRepository;
use App\Repository\ReviewRepository;
use App\Repository\SpecializationRepository;
use App\Repository\UserRepository;
use App\Types\RespondentStatus;
use App\Types\ReviewActions;
use App\Types\ReviewStatus;
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
		GradeRepository $gradeRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);
			$subject = $userRepository->find($request->get('subject'));
			$lead = $userRepository->find($request->get('lead'));

			if ($request->get('subject') === $request->get('lead')) {
				return $this->response([
					'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
					'message' => 'Объект оценки и проверяющий не могут быть одним и тем же пользователем'
				], Response::HTTP_UNPROCESSABLE_ENTITY);
			}

            if (!in_array('ROLE_LEADER', $lead->getRoles())) {
                return $this->response([
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Пользователь с id ' . $request->get('lead') . ' не является техническим лидером.'
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            if ($lead->getRoles())

            if (!$subject || !$lead) {
                return $this->response([
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Отсутствует пользователь с таким id',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

			$qualification = $request->get('qualification');
			$specialization = $specializationRepository->find($qualification['specialization']);

            if(!$specialization) {
                return $this->response([
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Отсутствует специализация с таким id',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

			$specializationGrades = $specialization->getGrades();
			$grade = $gradeRepository->find($qualification['grade']);

			if(!$grade || !$specializationGrades->contains($grade)) {
				return $this->response([
					'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
					'message' => 'У выбранной специализации отсутствует грейд с таким id',
				], Response::HTTP_UNPROCESSABLE_ENTITY);
			}

            $review = new Review();
            $review->setSubject($subject);
			$review->setLead($lead);
            $review->setDateStart(date_timestamp_get(new DateTime()));
			$review->setSpecialization($specialization);
			$review->setGrade($grade);

            $history = [];
            $history[] = [
				'action' => ReviewActions::INITIALIZE,
                'user' => $this->getUser(),
                'comment' => null,
                'created_at' => date_timestamp_get(new DateTime())
            ];
            $review->setHistory($history);

            $this->entityManager->persist($review);
            $this->entityManager->flush();

            return $this->response([
	            'status' => Response::HTTP_OK,
	            'message' => 'Review успешно инициализирован',
            ]);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'message' => $e->getMessage(),
            ];
            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/reviews', name: 'get_reviews', methods: ['GET'])]
    public function get_reviews(Request $request, ReviewRepository $reviewRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);
			$requestType = $request->get('type');

            if ($requestType === 'lead') {
	            $reviews = $reviewRepository->findBy(['lead' => $this->getUser()]);
			} elseif ($requestType === 'self') {
	            $reviews = $reviewRepository->findBy(['subject' => $this->getUser()]);
            } else {
	            $reviews = $reviewRepository->findAll();
            }

	        $data = $this->jsonSerialize($reviews, ['review-default', 'user-default', 'spec-default', 'grade-default']);

            return $this->response($data);
        } catch (\Exception $e) {
            return $this->response([
	            'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
	            'message' => $e->getMessage(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

	#[Route('/api/review/{id}', name: 'get_review', methods: ['GET'])]
	public function get_review(
		ReviewRepository $reviewRepository,
		RespondentRepository $respondentRepository,
		$id): Response
	{
		try {
			$review = $reviewRepository->find($id);

			if (!$review) {
				return $this->response([
					'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
					'message' => 'Отсутствует review с таким id',
				], Response::HTTP_UNPROCESSABLE_ENTITY);
			}

			$opinions = $respondentRepository->findBy(['review' => $review, 'status' => RespondentStatus::COMPLETED]);
			$normalizedOpinions = $this->normalize($opinions, ['respondent-default', 'user-default']);
			$normalizedReview = $this->normalize($review, ['review-full', 'user-default', 'spec-default', 'grade-default', 'respondent-default']);

			return $this->response($this->jsonSerialize(array_merge($normalizedReview, ["opinions" => $normalizedOpinions])));
		} catch (\Exception $e) {
			return $this->response([
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'message' => $e->getMessage(),
			], Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}

    #[Route('/api/review/{id}/status', name: 'set_review_status', methods: ['PUT'])]
    public function set_review_status(Request $request, ReviewRepository $reviewRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$reviewRepository->find($id)) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Отсутствует review с таким id',
                ];
            } elseif (!$request->get('status')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Не указан статус',
                ];
            } else {
                $review = $reviewRepository->find($id);

                if (!ReviewActions::getActionByStatus($request->get('status'))) {
                    return $this->response([
                        'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                        'message' => 'Такого статуса не существует',
                    ], Response::HTTP_UNPROCESSABLE_ENTITY);
                }

                $review->setStatus($request->get('status'));

				$newStatus = $request->get('status');

				if ($newStatus == ReviewStatus::OPINION_WAITING) {
					$respondents = $review->getRespondents();
					foreach ($respondents as $respondent) {
						$respondent->setStatus(RespondentStatus::WAITING);
					}
				}

                $review->addHistory(
					[
						'action' => ReviewActions::getActionByStatus($newStatus),
		                'user' => $this->getUser(),
		                'comment' => $request->get('comment'),
		                'created_at' => date_timestamp_get(new DateTime())
					]
                );

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'message' => 'Статус успешно изменен',
                ];
            }

            return $this->response($data);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'message' => $e->getMessage(),
            ];
            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/review/{id}/comment', name: 'add_review_comment', methods: ['PUT'])]
    public function add_review_comment(Request $request, ReviewRepository $reviewRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$reviewRepository->find($id)) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Review с таким id не найден',
                ];
            } elseif (!$request->get('comment')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Не указан комментарий',
                ];
            } else {
                $review = $reviewRepository->find($id);
                $review->addHistory(
	                [
						'action' => ReviewActions::ADD_COMMENT,
		                'user' => $this->getUser(),
		                'comment' => $request->get('comment'),
		                'created_at' => date_timestamp_get(new DateTime())
	                ]
                );

                $this->entityManager->persist($review);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'message' => 'Комментарий успешно добавлен',
                ];
            }

            return $this->response($data);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'message' => $e->getMessage(),
            ];
            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/review/{id}/self-review', name: 'add_self_review', methods: ['PUT'])]
    public function change_self_review(Request $request, ReviewRepository $reviewRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$reviewRepository->find($id)) {
	            return $this->response([
		            'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
		            'message' => 'Review с таким id не найден',
	            ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

			if (!$request->get('selfReview')) {
                return $this->response([
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Self review не указан',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

	        $review = $reviewRepository->find($id);
	        $review->setSelfReview($request->get('selfReview'));

	        $review->addHistory(
		        [
			        'action' => ReviewActions::ADD_SELF_REVIEW,
			        'user' => $this->getUser(),
			        'comment' => null,
			        'created_at' => date_timestamp_get(new DateTime())
		        ]
	        );

	        $this->entityManager->persist($review);
	        $this->entityManager->flush();

	        $data = [
		        'status' => Response::HTTP_OK,
		        'message' => 'Self-review успешно добавлен',
	        ];

            return $this->response($data);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'message' => $e->getMessage(),
            ];
            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

	#[Route('/api/review/{id}/respondents', name: 'add_respondents', methods: ['PUT'])]
	function change_respondents(
		Request $request,
		ReviewRepository $reviewRepository,
		UserRepository $userRepository,
		QuestionRepository $questionRepository,
		$id): Response
	{
		try {
			$request = $this->transformJsonBody($request);
			$review = $reviewRepository->find($id);

			if (!$review) {
				return $this->response([
					'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
					'message' => 'Review с таким id не найден',
				], Response::HTTP_UNPROCESSABLE_ENTITY);
			}

			$respondentsId = $request->get('respondents');

			if (!$respondentsId) {
				return $this->response([
					'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
					'message' => 'Не задан список респондентов',
				], Response::HTTP_UNPROCESSABLE_ENTITY);
			}

			$respondents = [];
			$review->removeRespondents();
			foreach ($respondentsId as $respondentId) {
				$newRespondent = new Respondent();
				$newRespondent->setUser($userRepository->find($respondentId));

				$specialization = $review->getSpecialization();
				$grade = $review->getGrade();
				$questions = $questionRepository->findBy(
					[
						'specialization' => $specialization,
						'grade' => $grade,
					]
				);

				foreach ($questions as $question) {
					$opinion = new Opinion();
					$opinion->setQuestion($question);
					$this->entityManager->persist($opinion);
					$newRespondent->addOpinion($opinion);
				}

				$this->entityManager->persist($newRespondent);
				$respondents[] = $newRespondent;
			}
			$this->entityManager->flush();

			$review->setRespondents($respondents);

			$review->addHistory(
				[
					'action' => ReviewActions::ADD_RESPONDENTS_LIST,
					'user' => $this->getUser(),
					'comment' => $request->get('comment'),
					'created_at' => date_timestamp_get(new DateTime())
				]
			);

			$this->entityManager->persist($review);
			$this->entityManager->flush();
			return $this->response([
				'status' => Response::HTTP_OK,
				'message' => 'Респонденты успешно изменены',
			]);
		} catch (\Exception $e) {
			return $this->response([
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'message' => $e->getMessage(),
			], Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}
}
