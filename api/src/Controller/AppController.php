<?php

namespace App\Controller;

use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\ArrayDenormalizer;
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

	public function normalize($data, $groups = []): array
	{
		$encoders = [new JsonEncoder()];
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$normalizers = [new ObjectNormalizer($classMetadataFactory)];
		$serializer = new Serializer($normalizers, $encoders);

		$context = (new ObjectNormalizerContextBuilder())
			->withGroups($groups)
			->withIgnoredAttributes(['__initializer__', '__cloner__', '__isInitialized__', 'userIdentifier'])
			->toArray();

		return $serializer->normalize($data, null, $context);
	}

	public function jsonSerialize($data, $groups = []): string
	{
		$encoders = [new JsonEncoder()];
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$normalizers = [new ObjectNormalizer($classMetadataFactory)];
		$serializer = new Serializer($normalizers, $encoders);

		$context = (new ObjectNormalizerContextBuilder())
			->withGroups($groups)
			->withIgnoredAttributes(['__initializer__', '__cloner__', '__isInitialized__', 'userIdentifier'])
			->toArray();

		return $serializer->serialize($data, 'json', $context);
	}
}
