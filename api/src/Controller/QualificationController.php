<?php

namespace App\Controller;

use App\Entity\Qualification;
use App\Repository\GradeRepository;
use App\Repository\QualificationRepository;
use App\Repository\QuestionRepository;
use App\Repository\SpecializationRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class QualificationController extends AppController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function add_qualification($specialization, $grade)
    {
        $qualification = new Qualification();
        $qualification->setCreatedAt(new DateTimeImmutable());
        $qualification->setSpecializationId($specialization);
        $qualification->setGradeId($grade);

        $this->entityManager->persist($qualification);
        $this->entityManager->flush();
    }

    #[Route('/api/qualification', name: 'get_all_qualifications', methods: ['GET'])]
    public function get_qualifications(QualificationRepository $qualificationRepository, GradeRepository $gradeRepository, SpecializationRepository $specializationRepository, QuestionRepository $questionRepository): Response
    {
        try {
            $qualifications = $qualificationRepository->findAll();
            $qualificationArray = [];

            foreach ($qualifications as $qualification) {
                $grade = $gradeRepository->find($qualification->getGradeId());
                $specialization = $specializationRepository->find($qualification->getSpecializationId());
                $questions = $qualification->getQuestions();
                $temp_questions = [];
                foreach ($questions as $question_id) {
                    $temp_question = $questionRepository->find($question_id);
                    array_push($temp_questions, ['id' => $temp_question->getId(), 'text' => $temp_question->getText(), 'rating' => $temp_question->getRating()]);
                }
                $temp_qualification = [
                    'id' => $qualification->getId(),
                    'created_at' => $qualification->getCreatedAt(),
                    'grade' => [
                        'id' => $grade->getId(),
                        'name' => $grade->getName(),
                        'description' => $grade->getDescription()
                    ],
                    'specialization' => [
                        'id' => $specialization->getId(),
                        'name' => $specialization->getName()
                    ],
                    'questions' => $temp_questions
                ];
                array_push($qualificationArray, $temp_qualification);
            }

            return $this->response($qualificationArray);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];

            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function delete_qualification(QualificationRepository $qualificationRepository, $id): Response
    {
        try {
            $qualification = $qualificationRepository->find($id);

            $this->entityManager->remove($qualification);
            $this->entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Qualification deleted successfully',
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
