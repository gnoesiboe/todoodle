<?php

namespace AppBundle\Controller;

use AppBundle\Entity\TodoList;
use AppBundle\Entity\TodoListItem;
use AppBundle\Repository\TodoListRepository;
use AppBundle\Response\Factory\TodoListItemResponseFactory;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListItemRemoveController
{
    /**
     * @var TodoListRepository
     */
    private $todoListRepository;

    /**
     * @var TodoListItemResponseFactory
     */
    private $responseFactory;

    /**
     * @param TodoListRepository $todoListRepository
     * @param TodoListItemResponseFactory $responseFactory
     */
    public function __construct(TodoListRepository $todoListRepository, TodoListItemResponseFactory $responseFactory)
    {
        $this->todoListRepository = $todoListRepository;
        $this->responseFactory = $responseFactory;
    }

    /**
     * @param int $todoListId
     * @param string $todoListToken
     * @param int $id
     *
     * @return JsonResponse
     */
    public function removeAction($todoListId, $todoListToken, $id)
    {
        $todoList = $this->getTodoListOrThrow($todoListId, $todoListToken);
        $todoListItem = $this->getItemFromTodoListOrThrow($todoList, $id);

        $todoList->removeItem($todoListItem);

        $this->todoListRepository->update($todoList);

        return $this->responseFactory->createRemovedResponse();
    }

    /**
     * @param TodoList $todoList
     * @param int $id
     *
     * @return TodoListItem
     */
    private function getItemFromTodoListOrThrow(TodoList $todoList, $id)
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
    private function getTodoListOrThrow($id, $token)
    {
        $todoList = $this->todoListRepository->findOneByIdAndToken($id, $token);

        if (!$todoList instanceof TodoList) {
            throw new NotFoundHttpException("No todo list found with id: {$id} and token: {$token}");
        }

        return $todoList;
    }
}
