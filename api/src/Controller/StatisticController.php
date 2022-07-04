<?php

namespace App\Controller;

use App\Repository\ReviewRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StatisticController extends AppController
{
    #[Route('/api/statistic/respondent/{id}', name: 'statistic_respondent', methods: ['GET'])]
    public function get_statistic_respondent(UserRepository $userRepository, ReviewRepository $reviewRepository, $id): JsonResponse
    {
        try {
            $user = $userRepository->find($id);
            $data = ['total' => 0, 'users' => []];
            if (!$user) {
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
}
