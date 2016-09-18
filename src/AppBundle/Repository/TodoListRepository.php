<?php

namespace AppBundle\Repository;

use AppBundle\Entity\TodoList;
use Doctrine\ORM\EntityRepository;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListRepository extends EntityRepository
{
    /**
     * @param int $id
     * @param string $token
     *
     * @return TodoList|null
     */
    public function findOneByIdAndToken($id, $token)
    {
        $query = $this->createQueryBuilder('tl')
            ->where('tl.id = :id')
            ->setParameter('id', $id)
            ->andWhere('tl.token = :token')
            ->setParameter('token', $token)
            ->getQuery();

        return $query->getOneOrNullResult();
    }

    /**
     * @param TodoList $todoList
     */
    public function add(TodoList $todoList)
    {
        $this->getEntityManager()->persist($todoList);
        $this->getEntityManager()->flush();
    }
}
