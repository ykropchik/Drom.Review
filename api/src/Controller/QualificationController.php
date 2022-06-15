<?php

namespace App\Controller;

use App\Entity\Qualification;
use App\Repository\GradeRepository;
use App\Repository\QualificationRepository;
use App\Repository\SpecializationRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class QualificationController extends AppController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/qualification', name: 'add_qualification', methods: ['POST'])]
    public function add_qualification(Request $request, GradeRepository $gradeRepository, SpecializationRepository $specializationRepository): Response
    {
        try {
            $request = $this->transformJsonBody($request);
            if (!$request->get('specialization_id') or !$request->get('grade_id')) {
                $data = [
                    'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'Unprocessable entity',
                ];
            } else {
                if (!$gradeRepository->find($request->get('grade_id'))) {
                    $data = [
                        'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                        'error' => 'Unprocessable entity. No Grade with this id',
                    ];
                } elseif (!$specializationRepository->find($request->get('specialization_id'))) {
                    $data = [
                        'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
                        'error' => 'Unprocessable entity. No Specialization with this id',
                    ];
                } else {
                    $qualification = new Qualification();
                    $qualification->setCreatedAt(new DateTimeImmutable());
                    $qualification->setSpecializationId($request->get('specialization_id'));
                    $qualification->setGradeId($request->get('grade_id'));

                    $this->entityManager->persist($qualification);
                    $this->entityManager->flush();

                    $data = [
                        'status' => Response::HTTP_OK,
                        'success' => 'Qualification added successfully',
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

    #[Route('/api/qualification', name: 'get_all_qualifications', methods: ['GET'])]
    public function get_qualifications(QualificationRepository $qualificationRepository, GradeRepository $gradeRepository, SpecializationRepository $specializationRepository): Response
    {
        try {
            $qualifications = $qualificationRepository->findAll();
            $qualificationArray = [];

            foreach ($qualifications as $qualification) {
                $grade = $gradeRepository->find($qualification->getGradeId());
                $specialization = $specializationRepository->find($qualification->getSpecializationId());
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
                    ]
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

    #[Route('/api/qualification/{id}', name: 'delete_qualification', methods: ['DELETE'])]
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
