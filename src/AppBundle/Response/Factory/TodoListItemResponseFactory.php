<?php

namespace AppBundle\Response\Factory;

use AppBundle\Entity\TodoListItem;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListItemResponseFactory
{
    /**
     * @param TodoListItem $todoListItem
     *
     * @return array
     */
    public function createListBody(TodoListItem $todoListItem)
    {
        return [
            'id' => (int) $todoListItem->getId(),
            'title' => $todoListItem->getTitle(),
            'checked' => $todoListItem->isChecked()
        ];
    }

    /**
     * @param TodoListItem $todoListItem
     * @param string|null $externalReference
     *
     * @return JsonResponse
     */
    public function createDetailResponse(TodoListItem $todoListItem, $externalReference = null)
    {
        return new JsonResponse([
            'results' => [
                [
                    'todoListItem' => $this->createListBody($todoListItem)
                ]
            ],
            'externalReference' => $externalReference
        ]);
    }

    /**
     * @return JsonResponse
     */
    public function createRemovedResponse()
    {
        return new JsonResponse([
            'action' => [
                'success' => true
            ]
        ]);
    }
}
