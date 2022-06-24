<?php

namespace App\Controller;

use App\Entity\Opinion;
use App\Repository\OpinionRepository;
use App\Repository\QuestionRepository;
use App\Repository\RespondentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RespondentController extends AppController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/respondent/opinion/{id}', name: 'leave_opinion', methods: ['POST'])]
    public function leave_opinion(
        Request $request,
        RespondentRepository $respondentRepository,
        QuestionRepository $questionRepository,
        $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$respondentRepository->find($id)) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Отсутствует респондент с таким id',
                ];
            } else {
                foreach ($request->get('opinions') as $opinion) {
                    if (!$questionRepository->find($opinion['question_id'])) {
                        $data = [
                            'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                            'errors' => 'Отсутствует вопрос с таким id',
                        ];
                        return $this->response($data);
                    }
                    $opinion_obj = new Opinion();
                    $opinion_obj->setQuestion($questionRepository->find($opinion['question_id']));
                    $opinion_obj->setEstimate($opinion['estimate']);
                    $this->entityManager->persist($opinion_obj);
                    $respondent = $respondentRepository->find($id);
                    $respondent->addOpinion($opinion_obj);
                    $this->entityManager->persist($respondent);
                }

                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Мнения успешно оставлены',
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

    #[Route('/api/respondent/opinion/{id}', name: 'delete_opinion', methods: ['DELETE'])]
    public function delete_opinion(
        Request $request,
        RespondentRepository $respondentRepository,
        QuestionRepository $questionRepository,
        OpinionRepository $opinionRepository,
        $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$respondentRepository->find($id)) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'errors' => 'Отсутствует респондент с таким id',
                ];
            } else {
                foreach ($request->get('opinions') as $opinion_id) {
                    if (!$opinionRepository->find($opinion_id)) {
                        $data = [
                            'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                            'errors' => 'Отсутствует мнение с id ' . $opinion_id,
                        ];
                        return $this->response($data);
                    }
                    $opinion_obj = $opinionRepository->find($opinion_id);
                    $this->entityManager->remove($opinion_obj);
                    $respondent = $respondentRepository->find($id);
                    $respondent->removeOpinion($opinion_obj);
                    $this->entityManager->persist($respondent);
                }

                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Мнения успешно удалены',
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
