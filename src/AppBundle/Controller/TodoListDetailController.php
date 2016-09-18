<?php

namespace AppBundle\Controller;

use AppBundle\Entity\TodoList;
use AppBundle\Repository\TodoListRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListDetailController
{
    /**
     * @var TodoListRepository
     */
    private $repository;

    /**
     * @param TodoListRepository $repository
     */
    public function __construct(TodoListRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @Template()
     *
     * @param int $id
     * @param string $token
     *
     * @return array
     */
    public function detailAction($id, $token)
    {
        $todoList = $this->repository->findOneByIdAndToken($id, $token);

        if (!$todoList instanceof TodoList) {
            throw new NotFoundHttpException("No todo list found with id: {$id} and token: {$token}");
        }

        return [
            'todoList' => $todoList
        ];
    }
}
