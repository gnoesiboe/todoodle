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
     * @param {String} id
     *
     * @returns {number}
     */
    getIndexById(id) {
        return this._items.findIndex((todoListItem) => todoListItem.id === id);
    }

    /**
     * @param {String} externalId
     *
     * @returns {number}
     */
    getIndexByExternalId(externalId) {
        return this._items.findIndex((todoListItem) => todoListItem.externalId === externalId);
    }

    /**
     * @param {Number} index
     * @param {*=} defaultValue
     *
     * @returns {TodoListItem|*}
     */
    getOneWithIndex(index, defaultValue = null) {
        return typeof this._items[index] === 'undefined' ? defaultValue : this._items[index];
    }

    /**
     * @param {Number} index
     * @param {TodoListItem} todoListItem
     * @returns {TodoListItemCollection}
     */
    insertAtIndex(index, todoListItem) {
        var newDataSet = this._items.map((todoListItem) => todoListItem.clone());

        newDataSet[index] = todoListItem;

        return new TodoListItemCollection(newDataSet);
    }

    /**
     * @param {Number} index
     * @param {TodoListItem} incomingTodoListItem
     *
     * @returns {TodoListItemCollection}
     */
    mergeAtIndex(index, incomingTodoListItem) {
        if (!this.hasIndex(index)) {
            throw new Error('Could not merge todo list item as index does not exist');
        }

        var newTodoListItem = this._items[index].clone();

        newTodoListItem.externalId = incomingTodoListItem.externalId;

        return this.insertAtIndex(index, newTodoListItem);
    }

    /**
     * @param {Number} index
     *
     * @returns {boolean}
     */
    hasIndex(index) {
        return typeof this._items[index] !== 'undefined';
    }

    /**
     * @param {Number} index
     *
     * @returns {TodoListItemCollection}
     */
    removeAtIndex(index) {
        var newDataSet = this._items.map((todoListItem) => todoListItem.clone());

        newDataSet.splice(index, 1);

        return new TodoListItemCollection(newDataSet);
    }

    /**
     * @param {TodoListItem} todoListItem
     * 
     * @returns {TodoListItemCollection}
     */
    addItem(todoListItem) {
        var newDataSet = this._items.map((todoListItem) => todoListItem.clone());

        newDataSet.push(todoListItem);

        return new TodoListItemCollection(newDataSet);
    }

    /**
     * @returns {TodoListItemCollection}
     */
    clone() {
        return new TodoListItemCollection(
            this._items.map((todoListItem) => todoListItem.clone())
        );
    }

    /**
     * @returns {Number}
     */
    count() {
        return this._items.length;
    }

    /**
     * @returns {TodoListItem|null}
     */
    first() {
        return this.count() > 0 ? this._items[0] : null;
    }

    /**
     * @returns {TodoListItem|null}
     */
    last() {
        return this.count() > 0 ? this._items[this.count() - 1] : null;
    }

    /**
     * @returns {Array}
     */
    all() {
        return this._items;
    }
}

export default TodoListItemCollection;
