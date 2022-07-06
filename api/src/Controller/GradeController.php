<?php

namespace App\Controller;

use App\Entity\Grade;
use App\Repository\GradeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GradeController extends AppController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/grade', name: 'add_grade', methods: ['POST'])]
    public function add_grade(Request $request, GradeRepository $gradeRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);
            if ($request->get('type') == 'validate') {
                if ($gradeRepository->findOneBy(['name' => $request->get('name')])) {
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
                $grade = new Grade();
                $grade->setName($request->get('name'));
                $grade->setDescription($request->get('description'));

                $this->entityManager->persist($grade);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Грейд успешно добавлен',
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

    #[Route('/api/grade', name: 'get_all_grades', methods: ['GET'])]
    public function get_grades(GradeRepository $gradeRepository): Response
    {
        try {
            $grades = $gradeRepository->findAll();

            return $this->response($this->jsonSerialize($grades, ['grade-default']));
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];

            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/grade/{id}', name: 'update_grade', methods: ['PUT'])]
    public function update_grade(Request $request, GradeRepository $gradeRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            $grade = $gradeRepository->find($id);
            $grade->setName($request->get('name'));
            $grade->setDescription($request->get('description'));

            $this->entityManager->persist($grade);
            $this->entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Грейд успешно обновлен',
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

    #[Route('/api/grade/{id}', name: 'delete_grade', methods: ['DELETE'])]
    public function delete_grade(GradeRepository $gradeRepository, $id): Response
    {
        try {
            $grade = $gradeRepository->find($id);

            $this->entityManager->remove($grade);
            $this->entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Грейд успешно удален',
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
