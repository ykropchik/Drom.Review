<?php

namespace App\Controller;

use App\Repository\QuestionRepository;
use App\Repository\ReviewRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StatisticController extends AppController
{
    #[Route('/api/statistic/review/{id}/respondent', name: 'statistic_respondent', methods: ['GET'])]
    public function get_statistic_respondent(UserRepository $userRepository, ReviewRepository $reviewRepository, $id): JsonResponse
    {
        try {
            $data = ['total' => 0, 'users' => []];
            if (!$userRepository->find($id)) {
                return $this->response([
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Пользователя с таким id не существует',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $reviews = $reviewRepository->findAll();
            foreach ($reviews as $review) {
                if ($review->isRespondent($id)) {
                    $data['total']++;
                    array_push($data['users'], ['user' => $review->getSubject(), 'specialization' => $review->getSpecialization(), 'grade' => $review->getGrade()]);
                }
            }

            return $this->response($this->jsonSerialize($data));
        } catch (\Exception $e) {
            return $this->response([
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'message' => $e->getMessage(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/statistic/review/{id}', name: 'statistic_review', methods: ['GET'])]
    public function get_statistic_review(UserRepository $userRepository, ReviewRepository $reviewRepository, $id): JsonResponse
    {
        try {
            $data = [];
            if (!$userRepository->find($id)) {
                return $this->response([
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Пользователя с таким id не существует',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $reviews = $reviewRepository->findAll();
            foreach ($reviews as $review) {
                if ($review->getSubject()->getId() == $id) {
                    array_push($data, $review);
                }
            }

            return $this->response($this->jsonSerialize($data, ['review-full', 'user-default', 'spec-default', 'grade-default', 'respondent-default']));
        } catch (\Exception $e) {
            return $this->response([
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'message' => $e->getMessage(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/statistic/review/{id}/opinions', name: 'statistic_review', methods: ['GET'])]
    public function get_statistic_opinions(ReviewRepository $reviewRepository, QuestionRepository $questionRepository, $id): JsonResponse
    {
        try {
            $review = $reviewRepository->find($id);
            $data = [];
            if (!$review) {
                return $this->response([
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => 'Ревью с таким id не существует',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $questions = $questionRepository->findBy(['specialization' => $review->getSpecialization()->getId(), 'grade' => $review->getGrade()->getId()]);

            foreach ($questions as $question) {
                $statistic = [];
                foreach ($question->getRating() as $estimate) {
                    array_push($statistic, ['answer' => $estimate, 'count' => 0]);
                }
                array_push($data, ['id' => $question->getId(), 'text' => $question->getText(), 'statistic' => $statistic]);
            }

            $respondents = $review->getRespondents();
            foreach ($respondents as $respondent) {
                $opinions = $respondent->getOpinions();
                foreach ($opinions as $opinion) {
                    $key = array_search($opinion->getQuestion()->getId(), array_column($data, 'id'));
                    $data[$key]['statistic'][array_search($opinion->getEstimate(), array_column($data[$key]['statistic'], 'answer'))]['count']++;
                }
            }

            return $this->response($data);
        } catch (\Exception $e) {
            return $this->response([
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'message' => $e->getMessage(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
