/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListItem {

    /**
     * @param {String} id
     * @param {Number} externalId
     * @param {String} title
     * @param {Boolean=} checked
     */
    constructor(id, externalId, title, checked = false) {
        this._id = id;
        this._externalId = externalId;
        this._title = title;
        this._checked = checked;
    }

    /**
     * @returns {String}
     */
    get id() {
        return this._id;
    }

    /**
     * @returns {Number}
     */
    get externalId() {
        return this._externalId;
    }

    /**
     * @returns {String}
     */
    get title() {
        return this._title;
    }

    /**
     * @param {String} title
     */
    set title(title) {
        this._title = title;
    }

    /**
     * @returns {Boolean}
     */
    get checked() {
        return this._checked;
    }

    /**
     * @param {Boolean} checked
     */
    set checked(checked) {
        this._checked = checked;
    }

    /**
     * @returns {TodoListItem}
     */
    clone() {
        return new TodoListItem(
            this._id,
            this._externalId,
            this._title,
            this._checked
        );
    }
}

export default TodoListItem;
