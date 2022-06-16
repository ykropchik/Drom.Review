<?php

namespace App\Controller;

use App\Entity\Question;
use App\Repository\QuestionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class QuestionController extends AppController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/question', name: 'add_question', methods: ['POST'])]
    public function add_question(Request $request, QuestionRepository $questionRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if ($request->get('type') == 'validate') {
                if ($questionRepository->findOneBy(['text' => $request->get('text')])) {
                    $data = [
                        'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                        'exist' => true,
                    ];
                } else {
                    $data = [
                        'status' => Response::HTTP_OK,
                        'exist' => false,
                    ];
                }
            } else {
                $question = new Question();
                $question->setText($request->get('text'));
                $question->setRating($request->get('rating'));

                $this->entityManager->persist($question);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Question added successfully',
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

    #[Route('/api/question', name: 'get_all_questions', methods: ['GET'])]
    public function get_questions(QuestionRepository $questionRepository): Response
    {
        try {
            $questions = $questionRepository->findAll();

            $questionArray = [];

            foreach ($questions as $question) {
                $temp_question = [
                    'id' => $question->getId(),
                    'name' => $question->getText(),
                    'rating' => $question->getRating(),
                ];
                array_push($questionArray, $temp_question);
            }

            return $this->response($questionArray);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];

            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/question/{id}', name: 'update_question', methods: ['PUT'])]
    public function update_question(Request $request, QuestionRepository $questionRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            $question = $questionRepository->find($id);
            $question->setText($request->get('text'));
            $question->setRating($request->get('rating'));

            $this->entityManager->persist($question);
            $this->entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Question updated successfully',
            ];

            return $this->response($data);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];
            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/question/{id}', name: 'delete_question', methods: ['DELETE'])]
    public function delete_question(QuestionRepository $questionRepository, $id): Response
    {
        try {
            $question = $questionRepository->find($id);

            $this->entityManager->remove($question);
            $this->entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Question deleted successfully',
            ];

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
