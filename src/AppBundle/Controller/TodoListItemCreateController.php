<?php

namespace AppBundle\Controller;
use AppBundle\Entity\TodoListItem;
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
final class TodoListItemCreateController extends Controller
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
     *
     * @return JsonResponse
     */
    public function createAction(Request $request, $todoListId, $todoListToken)
    {
        $todoList = $this->getTodoListOrThrow($todoListId, $todoListToken);

        $externalReference = $request->query->get('external_reference', null);

        $todoListItem = new TodoListItem($todoList);

        $form = $this->formFactory->createNamed(null, TodoListItemType::class, $todoListItem);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            throw new BadRequestHttpException($form->getErrors(true)->__toString());
        }

        $todoList->addItem($todoListItem);

        $this->todoListRepository->update($todoList);

        return $this->responseFactory->createDetailResponse($todoListItem, $externalReference);
    }
}
