/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoList {

    /**
     * @param {String} id
     * @param {Number} externalId
     * @param {String} token
     * @param {String} createdAt
     */
    constructor(id, externalId, token, createdAt) {
        this._id = id;
        this._externalId = externalId;
        this._token = token;
        this._createdAt = createdAt;
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
    get exernalId() {
        return this._externalId;
    }

    /**
     * @returns {String}
     */
    get token() {
        return this._token;
    }

    /**
     * @returns {String}
     */
    get createdAt() {
        return this._createdAt;
    }
}

export default TodoList
