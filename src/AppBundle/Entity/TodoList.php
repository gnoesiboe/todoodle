<?php

namespace AppBundle\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 *
 * @final
 */
final class TodoList
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $token;

    /**
     * @var \DateTime
     */
    private $createdAt;

    /**
     * @var Collection|TodoListItem[]
     */
    private $items;

    /**
     * @param string $token
     */
    public function __construct($token)
    {
        $this->token = $token;
        $this->createdAt = new \DateTime('now');

        $this->items = new ArrayCollection();
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
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param string $token
     *
     * @return $this
     */
    public function setToken($token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @return TodoListItem[]|Collection
     */
    public function getItems()
    {
        return $this->items;
    }

    /**
     * @param int $id
     *
     * @return TodoListItem|null
     */
    public function getItemWithId($id)
    {
        return $this->items
            ->filter(function (TodoListItem $item) use ($id) {
                return $item->isId($id);
            })
            ->first();
    }
}
