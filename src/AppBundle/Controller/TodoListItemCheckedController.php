<?php

namespace AppBundle\Controller;

use AppBundle\Entity\TodoListItem;
use AppBundle\Repository\TodoListRepository;
use AppBundle\Response\Factory\TodoListItemResponseFactory;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListItemCheckedController extends Controller
{
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
        parent::__construct($todoListRepository);

        $this->responseFactory = $responseFactory;
    }

    /**
     * @param int $todoListId
     * @param string $todoListToken
     * @param int $id
     *
     * @return JsonResponse
     */
    public function checkAction($todoListId, $todoListToken, $id)
    {
        $todoList = $this->getTodoListOrThrow($todoListId, $todoListToken);
        $todoListItem = $this->getItemFromTodoListOrThrow($todoList, $id);

        $this->validateTodoListItemIsNotAlreadyChecked($todoListItem);

        $todoListItem->check();

        $this->todoListRepository->update($todoList);

        return $this->responseFactory->createDetailResponse($todoListItem);
    }

    /**
     * @param int $todoListId
     * @param string $todoListToken
     * @param int $id
     *
     * @return JsonResponse
     */
    public function uncheckAction($todoListId, $todoListToken, $id)
    {
        $todoList = $this->getTodoListOrThrow($todoListId, $todoListToken);
        $todoListItem = $this->getItemFromTodoListOrThrow($todoList, $id);

        $this->validateTodoListItemIsNotAlreadyUnchecked($todoListItem);

        $todoListItem->uncheck();

        $this->todoListRepository->update($todoList);

        return $this->responseFactory->createDetailResponse($todoListItem);
    }

    /**
     * @param TodoListItem $todoListItem
     */
    private function validateTodoListItemIsNotAlreadyChecked(TodoListItem $todoListItem)
    {
        if ($todoListItem->isChecked()) {
            throw new BadRequestHttpException("Todo list item {$todoListItem->getId()} is already checked");
        }
    }

    /**
     * @param TodoListItem $todoListItem
     */
    private function validateTodoListItemIsNotAlreadyUnchecked(TodoListItem $todoListItem)
    {
        if (!$todoListItem->isChecked()) {
            throw new BadRequestHttpException("Todo list item {$todoListItem->getId()} is already unchecked");
        }
    }
}
