/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class CurrentMap {

    /**
     * @param {TodoList} todoList
     * @param {String} todoLIstItemId
     */
    constructor(todoList = null, todoLIstItemId = null) {
        this._todoList = todoList;
        this._todoListItemId = todoLIstItemId;
    }

    /**
     * @returns {TodoList}
     */
    get todoList() {
        return this._todoList;
    }

    /**
     * @param {TodoList} todoList
     */
    setTodoList(todoList) {
        return new CurrentMap(
            todoList,
            this._todoListItemId
        );
    }

    /**
     * @returns {String}
     */
    get todoListItemId() {
        return this._todoListItemId;
    }

    /**
     * @param {String} id
     */
    setTodoListItemId(id) {
        return new CurrentMap(
            this._todoList ? this._todoList.clone() : null,
            id
        );
    }
}

export default CurrentMap;
