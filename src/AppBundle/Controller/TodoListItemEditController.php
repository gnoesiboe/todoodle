<?php

namespace AppBundle\Controller;

use AppBundle\Form\Type\TodoListItemType;
use AppBundle\Repository\TodoListRepository;
use AppBundle\Response\Factory\TodoListItemResponseFactory;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListItemEditController extends Controller
{
    /**
     * @var TodoListItemResponseFactory
     */
    private $responseFactory;

    /**
     * @var FormFactoryInterface
     */
    private $formFactory;

    /**
     * @param TodoListRepository $todoListRepository
     * @param TodoListItemResponseFactory $responseFactory
     * @param FormFactoryInterface $formFactory
     */
    public function __construct(
        TodoListRepository $todoListRepository,
        TodoListItemResponseFactory $responseFactory,
        FormFactoryInterface $formFactory
    ) {
        parent::__construct($todoListRepository);

        $this->responseFactory = $responseFactory;
        $this->todoListRepository = $todoListRepository;
        $this->formFactory = $formFactory;
    }

    /**
     * @param Request $request
     * @param int $todoListId
     * @param string $todoListToken
     * @param int $id
     *
     * @return JsonResponse
     */
    public function editAction(Request $request, $todoListId, $todoListToken, $id)
    {
        $todoList = $this->getTodoListOrThrow($todoListId, $todoListToken);
        $todoListItem = $this->getItemFromTodoListOrThrow($todoList, $id);

        $form = $this->formFactory->createNamed(null, TodoListItemType::class, $todoListItem);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            throw new BadRequestHttpException($form->getErrors(true)->__toString());
        }

        $this->todoListRepository->update($todoList);

        return $this->responseFactory->createDetailResponse($todoListItem);
    }
}
