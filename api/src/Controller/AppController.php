<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class AppController extends AbstractController
{
    public function response($data, $status = Response::HTTP_OK, $headers = []): JsonResponse
    {
		$result = is_array($data) ? $data : json_decode($data);
	    return new JsonResponse($result, $status, $headers);
    }

    public function transformJsonBody(Request $request): Request
    {
        $data = json_decode($request->getContent(), true);
        if (null === $data) {
            return $request;
        }
        $request->request->replace($data);

        return $request;
    }

	public function jsonSerialize($data, $ignoredAttributes = []): string
	{
		$encoders = [new JsonEncoder()];
		$normalizers = [new ObjectNormalizer()];
		$serializer = new Serializer($normalizers, $encoders);

		$context = [
			'json_encode_options' => JSON_UNESCAPED_UNICODE,
			'ignored_attributes' => array_merge(['__initializer__', '__cloner__', '__isInitialized__', 'userIdentifier', 'password', 'reviews', 'review', 'respondent'], $ignoredAttributes),
		];

		return $serializer->serialize($data, 'json', $context);
	}
}
