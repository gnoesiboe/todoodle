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
     * @param string $token
     *
     * @return TodoList|null
     */
    public function findOneByToken($token)
    {
        $query = $this->createQueryBuilder('tl')
            ->where('tl.token = :token')
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
