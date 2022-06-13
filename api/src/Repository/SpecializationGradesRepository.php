<?php

namespace App\Repository;

use App\Entity\SpecializationGrades;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SpecializationGrades>
 *
 * @method SpecializationGrades|null find($id, $lockMode = null, $lockVersion = null)
 * @method SpecializationGrades|null findOneBy(array $criteria, array $orderBy = null)
 * @method SpecializationGrades[]    findAll()
 * @method SpecializationGrades[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SpecializationGradesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SpecializationGrades::class);
    }

    public function add(SpecializationGrades $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SpecializationGrades $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return SpecializationGrades[] Returns an array of SpecializationGrades objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SpecializationGrades
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
