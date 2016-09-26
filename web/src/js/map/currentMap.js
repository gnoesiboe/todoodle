/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class CurrentMap {

    /**
     * @param {TodoList} todoList
     * @param {String} todoLIstItemId
     * @param {String|null} editingTodoListItemId
     */
    constructor(todoList = null, todoLIstItemId = null, editingTodoListItemId = null) {
        this._todoList = todoList;
        this._todoListItemId = todoLIstItemId;
        this._editingTodoListItemId = editingTodoListItemId;
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
            this._todoListItemId,
            this._editingTodoListItemId
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
            id,
            this._editingTodoListItemId
        );
    }

    /**
     * @returns {String|null}
     */
    get editingTodoListItemId() {
        return this._editingTodoListItemId;
    }

    /**
     * @param {String|null} id
     *
     * @returns {CurrentMap}
     */
    setEditingTodoListItemId(id) {
        return new CurrentMap(
            this._todoList,
            this._todoListItemId,
            id
        );
    }
}

export default CurrentMap;
