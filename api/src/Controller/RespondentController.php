<?php

namespace App\Controller;

use App\Repository\OpinionRepository;
use App\Repository\RespondentRepository;
use App\Types\RespondentStatus;
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

	#[Route('/api/respondent', name: 'get_invitations', methods: ['GET'])]
	public function get_invitations(RespondentRepository $respondentRepository): Response
	{
		try {
			$invitations = $respondentRepository->findAllApprovedByUser($this->getUser());
			return $this->response($this->jsonSerialize($invitations, ['respondent-invite', 'user-default', 'spec-default', 'grade-default']));
		} catch (\Exception $e) {
			return $this->response([
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'message' => $e->getMessage(),
			], Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}

	#[Route('/api/respondent/{id}', name: 'get_respondent_info', methods: ['GET'])]
	public function get_respondent_info(RespondentRepository $respondentRepository, $id): Response
	{
		try {
			$invitation = $respondentRepository->find($id);
			return $this->response($this->jsonSerialize($invitation,
				['respondent-full', 'user-default', 'spec-default', 'grade-default', 'opinion-default', 'question-default']));
		} catch (\Exception $e) {
			return $this->response([
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'message' => $e->getMessage(),
			], Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}

	#[Route('/api/respondent/{id}/opinion', name: 'get_respondent_opinion', methods: ['GET'])]
	public function get_respondent_opinion(RespondentRepository $respondentRepository, $id): Response
	{
		try {
			$invitation = $respondentRepository->find($id);
			return $this->response($this->jsonSerialize($invitation,
				['respondent-opinion', 'opinion-default', 'question-default']));
		} catch (\Exception $e) {
			return $this->response([
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'message' => $e->getMessage(),
			], Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}

	#[Route('api/respondent/{id}/status', name: 'set_respondent_status', methods: ['POST'])]
	public function set_respondent_status(Request $request, RespondentRepository $respondentRepository, $id): Response
	{
		try {
			$request = $this->transformJsonBody($request);
			$respondent = $respondentRepository->find($id);
			$respondent->setStatus($request->get('status'));
			$this->entityManager->persist($respondent);
			$this->entityManager->flush();
			return $this->response([
				'status' => Response::HTTP_OK,
				'message' => 'Статус обновлен',
			]);
		} catch (\Exception $e) {
			return $this->response([
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'message' => $e->getMessage(),
			], Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}

	#[Route('api/respondent/{id}/opinion', name: 'set_respondent_opinion', methods: ['POST'])]
	function set_respondent_opinion(
		Request $request,
		RespondentRepository $respondentRepository,
		OpinionRepository $opinionRepository,
		$id): Response
	{
		try {
			$request = $this->transformJsonBody($request);
			$answers = $request->get('answers');

			foreach (array_keys($answers) as $opinionId) {
				$opinion = $opinionRepository->find($opinionId);
				$opinion->setEstimate($answers[$opinionId]);
				$this->entityManager->persist($opinion);
			}

			$comment = $request->get('comment');
			if ($comment) {
				$respondent = $respondentRepository->find($id);
				$respondent->setComment($comment);
				$respondent->setStatus(RespondentStatus::COMPLETED);
				$this->entityManager->persist($respondent);
			}

			$this->entityManager->flush();
			return $this->response([
				'status' => Response::HTTP_OK,
				'message' => '360-мнение отправлено',
			]);
		} catch (\Exception $e) {
			return $this->response([
				'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
				'message' => $e->getMessage(),
			], Response::HTTP_UNPROCESSABLE_ENTITY);
		}
	}
}