<?php

namespace AppBundle\Entity;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 *
 * @final
 */
class TodoListItem
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var TodoList
     */
    private $todoList;

    /**
     * @var string
     */
    private $title;

    /**
     * @var bool
     */
    private $checked = false;

    /**
     * @param TodoList $todoList
     * @param $title
     */
    public function __construct(TodoList $todoList, $title)
    {
        $this->todoList = $todoList;
        $this->title = $title;
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     *
     * @return $this
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return boolean
     */
    public function isChecked()
    {
        return $this->checked;
    }

    /**
     * @param boolean $checked
     *
     * @return $this
     */
    public function setChecked($checked)
    {
        $this->checked = $checked;

        return $this;
    }

    /**
     * @return $this
     */
    public function uncheck()
    {
        $this->setChecked(false);

        return $this;
    }

    /**
     * @return $this
     */
    public function check()
    {
        $this->setChecked(true);

        return $this;
    }

    /**
     * @param int $id
     *
     * @return bool
     */
    public function isId($id)
    {
        return (int) $this->id === (int) $id;
    }
}
