/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListItem {

    /**
     * @param {String} id
     * @param {String} title
     * @param {Number=} externalId
     * @param {Boolean=} checked
     */
    constructor(id, title, externalId = null, checked = false) {
        this._id = id;
        this._title = title;
        this._externalId = externalId;
        this._checked = checked;
    }

    /**
     * @returns {String}
     */
    get id() {
        return this._id;
    }

    /**
     * @returns {Number|null}
     */
    get externalId() {
        return this._externalId;
    }

    /**
     * @param {Number|null} externalId
     */
    set externalId(externalId) {
        this._externalId = externalId;
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
            this._title,
            this._externalId,
            this._checked
        );
    }
}

export default TodoListItem;
