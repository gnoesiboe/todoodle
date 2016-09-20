<?php

namespace AppBundle\Response\Factory;

use AppBundle\Entity\TodoList;
use AppBundle\Entity\TodoListItem;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListResponseFactory
{
    /**
     * @var TodoListItemResponseFactory
     */
    private $todoListItemResponseFactory;

    /**
     * @param TodoListItemResponseFactory $todoListItemResponseFactory
     */
    public function __construct(TodoListItemResponseFactory $todoListItemResponseFactory)
    {
        $this->todoListItemResponseFactory = $todoListItemResponseFactory;
    }

    /**
     * @param TodoList $todoList
     *
     * @return JsonResponse
     */
    public function createDetailResponse(TodoList $todoList)
    {
        return new JsonResponse([
            'results' => [
                [
                    'todoList' => [
                        'id' => (int) $todoList->getId(),
                        'token' => $todoList->getToken(),
                        'createdAt' => $todoList->getCreatedAt()->format('r'),
                        'items' => $todoList->getItems()->map(
                            function (TodoListItem $todoListItem) {
                                return $this->todoListItemResponseFactory->createListBody($todoListItem);
                            }
                        )->toArray()
                    ]
                ]
            ]
        ]);
    }
}
