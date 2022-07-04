<?php

namespace App\Controller;

use App\Entity\Question;
use App\Repository\GradeRepository;
use App\Repository\QuestionRepository;
use App\Repository\SpecializationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;
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
			$specialization = $specializationRepository->find($request->get('specialization_id'));

            if (!$specialization) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'Отсутсвует специализация с таким id',
                ];
            } else {
	            $specializationGrades = $specialization->getGrades();
				$grade = $gradeRepository->find($request->get('grade_id'));
				if (!$specializationGrades->contains($grade)) {
					return $this->response([
						'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
						'error' => 'Отсутсвует грейд с таким id',
					]);
				}

				$question = new Question();
				$question->setText($request->get('text'));
				$question->setRating($request->get('rating'));
				$question->setSpecialization($specialization);
				$question->setGrade($grade);

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

    #[Route('/api/question', name: 'get_questions', methods: ['GET'])]
    public function get_questions(
		Request $request,
		QuestionRepository $questionRepository,
		SpecializationRepository $specializationRepository,
		GradeRepository $gradeRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$specializationRepository->find($request->get('specialization_id'))) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'Отсутствует специализация с таким id',
                ];
            } else {
				$specialization = $specializationRepository->find($request->get('specialization_id'));
				$specializationGrades = $specialization->getGrades();
				$grade = $gradeRepository->find($request->get('grade_id'));

				if (!$specializationGrades->contains($grade)) {
					return $this->response([
						'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
						'error' => 'У специализации отсутствует грейд с таким id',
					]);
				}

                $questions = $questionRepository->findBy(['specialization' => $specialization, 'grade' => $grade,]);
				$data = $this->jsonSerialize($questions, ['question-default']);
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
                    'errors' => 'Отсутствует вопрос с таким id',
                ];
            } else {
                $question = $questionRepository->find($id);
                if ($request->get('text')) {
                    $question->setText($request->get('text'));
                }
                if ($request->get('rating')) {
                    $question->setRating($request->get('rating'));
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
                'success' => 'Вопрос успешно удален',
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
