<?php

namespace AppBundle\Controller;

use AppBundle\Entity\TodoList;
use AppBundle\Entity\TodoListItem;
use AppBundle\Repository\TodoListRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
abstract class Controller
{
    /**
     * @var TodoListRepository
     */
    protected $todoListRepository;

    /**
     * @param TodoListRepository $todoListRepository
     */
    public function __construct(TodoListRepository $todoListRepository)
    {
        $this->todoListRepository = $todoListRepository;
    }

    /**
     * @param TodoList $todoList
     * @param int $id
     *
     * @return TodoListItem
     */
    final protected function getItemFromTodoListOrThrow(TodoList $todoList, $id)
    {
        $todoListItem = $todoList->getItemWithId($id);

        if (!$todoListItem instanceof TodoListItem) {
            throw new NotFoundHttpException("Todo list {$todoList->getId()} does not contain an item with id: {$id}");
        }

        return $todoListItem;
    }

    /**
     * @param int $id
     * @param string $token
     *
     * @return TodoList
     */
    final protected function getTodoListOrThrow($id, $token)
    {
        $todoList = $this->todoListRepository->findOneByIdAndToken($id, $token);

        if (!$todoList instanceof TodoList) {
            throw new NotFoundHttpException("No todo list found with id: {$id} and token: {$token}");
        }

        return $todoList;
    }
}
