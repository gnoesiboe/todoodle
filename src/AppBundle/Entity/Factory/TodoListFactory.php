<?php

namespace AppBundle\Entity\Factory;

use AppBundle\Entity\TodoList;
use Ramsey\Uuid\Uuid;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class TodoListFactory
{
    /**
     * @return TodoList
     */
    public function create()
    {
        return new TodoList(
            $this->generateUniqueToken()
        );
    }

    /**
     * @return string
     */
    private function generateUniqueToken()
    {
        return Uuid::uuid4()
            ->toString();
    }
}
