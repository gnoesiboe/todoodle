<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Factory\TodoListFactory;
use AppBundle\Entity\TodoList;
use AppBundle\Repository\TodoListRepository;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class CreateNewTodoListController
{
    /**
     * @var TodoListRepository
     */
    private $repository;

    /**
     * @var TodoListFactory
     */
    private $factory;

    /**
     * @var UrlGeneratorInterface
     */
    private $urlGenerator;

    /**
     * @param TodoListRepository $repository
     * @param TodoListFactory $factory
     * @param UrlGeneratorInterface $urlGenerator
     */
    public function __construct(
        TodoListRepository $repository,
        TodoListFactory $factory,
        UrlGeneratorInterface $urlGenerator
    ) {
        $this->repository = $repository;
        $this->factory = $factory;
        $this->urlGenerator = $urlGenerator;
    }

    /**
     * @return RedirectResponse
     */
    public function createAction()
    {
        $todoList = $this->factory->create();

        $this->repository->add($todoList);

        return $this->generateRedirectToTodoListDetailResponse($todoList);
    }

    /**
     * @param TodoList $todoList
     *
     * @return RedirectResponse
     */
    private function generateRedirectToTodoListDetailResponse(TodoList $todoList)
    {
        return new RedirectResponse(
            $this->urlGenerator->generate(
                'todo_list_detail',
                [
                    'id' => $todoList->getId(),
                    'token' => $todoList->getToken()
                ]
            )
        );
    }
}
