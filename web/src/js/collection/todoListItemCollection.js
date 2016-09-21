/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListItemCollection {

    /**
     * @param {Array=} items
     */
    constructor(items = []) {
        this._items = items;
    }

    /**
     * @returns {Array}
     */
    all() {
        return this._items;
    }
}

export default TodoListItemCollection;
