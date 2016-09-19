<?php

namespace AppBundle\Controller;

use AppBundle\Entity\TodoList;
use AppBundle\Repository\TodoListRepository;
use AppBundle\Response\Factory\TodoListResponseFactory;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class ApiTodoListDetailController
{
    /**
     * @var TodoListRepository
     */
    private $repository;

    /**
     * @var TodoListResponseFactory
     */
    private $responseFactory;

    /**
     * @param TodoListRepository $repository
     * @param TodoListResponseFactory $responseFactory
     */
    public function __construct(TodoListRepository $repository, TodoListResponseFactory $responseFactory)
    {
        $this->repository = $repository;
        $this->responseFactory = $responseFactory;
    }

    /**
     * @param $id
     * @param $token
     *
     * @return JsonResponse
     */
    public function detailAction($id, $token)
    {
        $todoList = $this->repository->findOneByIdAndToken($id, $token);

        if (!$todoList instanceof TodoList) {
            throw new NotFoundHttpException("No todo list found with id: {$id} and token: {$token}");
        }

        return $this->responseFactory->createDetailResponse($todoList);
    }
}
