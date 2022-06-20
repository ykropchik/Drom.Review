<?php

namespace App\Controller;

use App\Entity\Question;
use App\Repository\GradeRepository;
use App\Repository\QuestionRepository;
use App\Repository\SpecializationRepository;
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
    public function add_question(Request $request, QuestionRepository $questionRepository, SpecializationRepository $specializationRepository, GradeRepository $gradeRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if ($request->get('type') == 'validate') {
                if ($questionRepository->findOneBy(['text' => $request->get('text'), 'specialization_id' => $request->get('specialization_id'), 'grade_id' => $request->get('grade_id')])) {
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
                } else {
                    $question = new Question();
                    $question->setText($request->get('text'));
                    $question->setRating($request->get('rating'));
                    $question->setSpecializationId($request->get('specialization_id'));
                    $question->setGradeId($request->get('grade_id'));

                    $this->entityManager->persist($question);
                    $this->entityManager->flush();

                    $data = [
                        'status' => Response::HTTP_OK,
                        'success' => 'Question added successfully',
                    ];
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

    #[Route('/api/question', name: 'get_questions', methods: ['GET'])]
    public function get_questions(Request $request, QuestionRepository $questionRepository, SpecializationRepository $specializationRepository, GradeRepository $gradeRepository): Response
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
            } else {
                $questions = $questionRepository->findBy(['specialization_id' => $request->get('specialization_id'), 'grade_id' => $request->get('grade_id'),]);

                $data = [];

                foreach ($questions as $question) {
                    $temp_question = [
                        'id' => $question->getId(),
                        'text' => $question->getText(),
                        'rating' => $question->getRating(),
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

    #[Route('/api/question/{id}', name: 'update_question', methods: ['PUT'])]
    public function update_question(Request $request, QuestionRepository $questionRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$questionRepository->find($id)) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'No question with this id',
                ];
            } else {
                $question = $questionRepository->find($id);
                if ($request->get('text')) {
                    $question->setText($request->get('text'));
                }
                if ($request->get('rating')) {
                    $question->setRating($request->get('rating'));
                }
                if ($request->get('specialization_id')) {
                    $question->setSpecializationId($request->get('specialization_id'));
                }
                if ($request->get('grade_id')) {
                    $question->setGradeId($request->get('grade_id'));
                }

                $this->entityManager->persist($question);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Question updated successfully',
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
