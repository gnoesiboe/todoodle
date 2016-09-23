<?php

namespace AppBundle\Controller;

use AppBundle\Repository\TodoListRepository;
use AppBundle\Response\Factory\TodoListItemResponseFactory;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListItemRemoveController extends Controller
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
    public function removeAction($todoListId, $todoListToken, $id)
    {
        $todoList = $this->getTodoListOrThrow($todoListId, $todoListToken);
        $todoListItem = $this->getItemFromTodoListOrThrow($todoList, $id);

        $todoList->removeItem($todoListItem);

        $this->todoListRepository->update($todoList);

        return $this->responseFactory->createRemovedResponse();
    }
}
