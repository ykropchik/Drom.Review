<?php

namespace App\Controller;

use App\Entity\Specialization;
use App\Entity\SpecializationGrades;
use App\Repository\GradeRepository;
use App\Repository\SpecializationGradesRepository;
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
    public function add_specialization(Request $request, SpecializationRepository $specializationRepository): Response
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
                $specialization = new Specialization();
                $specialization->setName($request->get('name'));

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
    public function get_specializations(SpecializationRepository $specializationRepository): Response
    {
        try {
            $specializations = $specializationRepository->findAll();

            $specializationArray = [];

            foreach ($specializations as $specialization) {
                $temp_specialization = [
                    'id' => $specialization->getId(),
                    'name' => $specialization->getName(),
                ];
                array_push($specializationArray, $temp_specialization);
            }

            return $this->response($specializationArray);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];

            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    #[Route('/api/specialization/{id}', name: 'update_specialization', methods: ['PUT'])]
    public function update_specialization(Request $request, SpecializationRepository $specializationRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            $specialization = $specializationRepository->find($id);
            $specialization->setName($request->get('name'));

            $this->entityManager->persist($specialization);
            $this->entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Specialization updated successfully',
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
                'success' => 'Specialization deleted successfully',
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

    #[Route('/api/specialization/grade/{id}', name: 'add_specializations_grade', methods: ['POST'])]
    public function add_specializations_grade(Request $request, SpecializationGradesRepository $specializationGradesRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if ($specializationGradesRepository->findOneBy([
                'specialization_id' => $id,
                'grade_id' => $request->get('grade_id')
            ])) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'Specializations grade already exist',
                ];
            } else {
                $specializationsGrade = new SpecializationGrades();
                $specializationsGrade->setSpecializationId($id);
                $specializationsGrade->setGradeId($request->get('grade_id'));

                $this->entityManager->persist($specializationsGrade);
                $this->entityManager->flush();

                $data = [
                    'status' => Response::HTTP_OK,
                    'success' => 'Specializations grade added successfully',
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

    #[Route('/api/specialization/grade/{id}', name: 'delete_specializations_grade', methods: ['DELETE'])]
    public function delete_specializations_grade(Request $request, SpecializationGradesRepository $specializationGradesRepository, $id): Response
    {
        try {
            $specializationGrade = $specializationGradesRepository->findOneBy(['specialization_id' => $id, 'grade_id' => $request->get('grade_id')]);

            $this->entityManager->remove($specializationGrade);
            $this->entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Specialization grade deleted successfully',
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
    public function get_specialization_grades(SpecializationGradesRepository $specializationGradesRepository, GradeRepository $gradeRepository, $id): Response
    {
        try {
            $specializationGrades = $specializationGradesRepository->findBy(['specialization_id' => $id]);

            $specializationGradesArray = [];

            foreach ($specializationGrades as $specializationGrade) {
                $grade = $gradeRepository->find($specializationGrade->getGradeId());
                $specializationGrade_temp = [
                    'id' => $grade->getId(),
                    'name' => $grade->getName(),
                    'description' => $grade->getDescription()
                ];
                array_push($specializationGradesArray, $specializationGrade_temp);
            }

            return $this->response($specializationGradesArray);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];

            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
