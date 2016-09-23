<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListDetailController extends Controller
{
    /**
     * @Template()
     *
     * @param int $id
     * @param string $token
     *
     * @return array
     */
    public function detailAction($id, $token)
    {
        $todoList = $this->getTodoListOrThrow($id, $token);

        return [
            'todoList' => $todoList
        ];
    }
}
