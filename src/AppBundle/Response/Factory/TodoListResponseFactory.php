<?php

namespace AppBundle\Response\Factory;

use AppBundle\Entity\TodoList;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListResponseFactory
{
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
                        'createdAt' => $todoList->getCreatedAt()->format('r')
                    ]
                ]
            ]
        ]);
    }
}
