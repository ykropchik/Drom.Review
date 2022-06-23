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
    public function add_specialization(Request $request, SpecializationRepository $specializationRepository, GradeRepository $gradeRepository): Response
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
                               'error' => 'Grade with id ' . $grade_id . ' does not exist',
                           ];
                           return $this->response($data);
                       }
                   }
                }
                $specialization = new Specialization();
                $specialization->setName($request->get('name'));
	            if ($request->get('grades')) {
		            $specialization->setGrades(array_map(fn ($grade_id
		            ) => $gradeRepository->find($grade_id), $request->get('grades')));
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
    public function update_specialization(Request $request, SpecializationRepository $specializationRepository, GradeRepository $gradeRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if ($request->get('grades')) {
                foreach ($request->get('grades') as $grade_id) {
                    if (!$gradeRepository->find($grade_id)) {
                        $data = [
                            'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                            'error' => 'Grade with id ' . $grade_id . ' does not exist',
                        ];
                        return $this->response($data);
                    }
                }
            }

//            $specialization = $specializationRepository->find($id);
//            $specialization->setName($request->get('name'));
//            $this->entityManager->persist($specialization);
//            $this->entityManager->flush();
//
//            if ($request->get('grades')) {
//                foreach ($request->get('grades') as $grade_id) {
//                    $specialization_grade = new SpecializationGrades();
//                    $specialization_grade->setSpecializationId($id);
//                    $specialization_grade->setGradeId($grade_id);
//                    $this->entityManager->persist($specialization_grade);
//                }
//                $this->entityManager->flush();
//            }

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
    public function add_specializations_grade(Request $request, GradeRepository $gradeRepository, $id): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            if (!$gradeRepository->find($request->get('grade_id'))) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'No grade with this id',
                ];
            }
//			else {
//                if ($specializationGradesRepository->findOneBy([
//                    'specialization_id' => $id,
//                    'grade_id' => $request->get('grade_id')
//                ])) {
//                    $data = [
//                        'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
//                        'error' => 'Specializations grade already exist',
//                    ];
//                }
//				else {
//                    $specializationsGrade = new SpecializationGrades();
//                    $specializationsGrade->setSpecializationId($id);
//                    $specializationsGrade->setGradeId($request->get('grade_id'));
//
//                    $this->entityManager->persist($specializationsGrade);
//                    $this->entityManager->flush();
//
//                    $data = [
//                        'status' => Response::HTTP_OK,
//                        'success' => 'Specializations grade added successfully',
//                    ];
//                }
//            }
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
    public function delete_specializations_grade(Request $request, $id): Response
    {
        try {
//            $specializationGrade = $specializationGradesRepository->findOneBy(['specialization_id' => $id, 'grade_id' => $request->get('grade_id')]);
//
//            $this->entityManager->remove($specializationGrade);
//            $this->entityManager->flush();
//
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
    public function get_specialization_grades(GradeRepository $gradeRepository, $id): Response
    {
        try {
//            $specializationGrades = $specializationGradesRepository->findBy(['specialization_id' => $id]);
//
//            $specializationGradesArray = [];
//
//            foreach ($specializationGrades as $specializationGrade) {
//                $grade = $gradeRepository->find($specializationGrade->getGradeId());
//                $specializationGrade_temp = [
//                    'id' => $grade->getId(),
//                    'name' => $grade->getName(),
//                    'description' => $grade->getDescription()
//                ];
//                array_push($specializationGradesArray, $specializationGrade_temp);
//            }
//
//            return $this->response($specializationGradesArray);
	        			return $this->response([]);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'errors' => $e->getMessage(),
            ];

            return $this->response($data, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
