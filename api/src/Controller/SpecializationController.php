<?php

namespace App\Controller;

use App\Entity\Specialization;
use App\Repository\GradeRepository;
use App\Repository\SpecializationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SpecializationController extends AppController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/specialization', name: 'add_specialization', methods: ['POST'])]
    public function add_specialization(
		Request $request,
		SpecializationRepository $specializationRepository,
		GradeRepository $gradeRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);
            if ($request->get('type') == 'validate') {
                if ($specializationRepository->findOneBy(['name' => $request->get('name')])) {
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
                if ($request->get('grades')) {
                   foreach ($request->get('grades') as $grade_id) {
                       if (!$gradeRepository->find($grade_id)) {
                           $data = [
                               'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                               'error' => 'Grade с id ' . $grade_id . ' не существует',
                           ];
                           return $this->response($data);
                       }
                   }
                }
                $specialization = new Specialization();
                $specialization->setName($request->get('name'));
	            if ($request->get('grades')) {
		            $specialization->setGrades(
						array_map(fn ($grade_id) => $gradeRepository->find($grade_id), $request->get('grades'))
		            );
	            }

                $this->entityManager->persist($specialization);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Specialization added successfully',
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

    #[Route('/api/specialization', name: 'get_all_specializations', methods: ['GET'])]
    public function get_specializations(
		Request $request,
		SpecializationRepository $specializationRepository,
	    GradeRepository $gradeRepository): Response
    {
        try {
            $specializations = $specializationRepository->findAll();

            return $this->response($this->jsonSerialize($specializations));
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];

            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/specialization/{id}', name: 'update_specialization', methods: ['PUT'])]
    public function update_specialization(
		Request $request,
		SpecializationRepository $specializationRepository,
		GradeRepository $gradeRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if ($request->get('grades')) {
                foreach ($request->get('grades') as $grade_id) {
                    if (!$gradeRepository->find($grade_id)) {
                        $data = [
                            'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                            'error' => 'Grade с id ' . $grade_id . ' не существует',
                        ];
                        return $this->response($data);
                    }
                }
            }

            $specialization = $specializationRepository->find($id);
            $specialization->setName($request->get('name'));
            $this->entityManager->persist($specialization);
            $this->entityManager->flush();

	        if ($request->get('grades')) {
		        $specialization->setGrades(
			        array_map(fn ($grade_id) => $gradeRepository->find($grade_id), $request->get('grades'))
		        );
	        } else {
				$specialization->setGrades([]);
	        }

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Специализация успешно обновлена',
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

    #[Route('/api/specialization/{id}', name: 'delete_specialization', methods: ['DELETE'])]
    public function delete_specialization(SpecializationRepository $specializationRepository, $id): Response
    {
        try {
            $specialization = $specializationRepository->find($id);

            $this->entityManager->remove($specialization);
            $this->entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Специализация успешно удалена',
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

    #[Route('/api/specialization/grade/{id}', name: 'get_specialization_grades', methods: ['GET'])]
    public function get_specialization_grades(SpecializationRepository $specializationRepository, GradeRepository $gradeRepository, $id): Response
    {
        try {
            $specializationGrades = $specializationRepository->find($id)->getGrades();

            return $this->response($this->jsonSerialize($specializationGrades));
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];

            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
