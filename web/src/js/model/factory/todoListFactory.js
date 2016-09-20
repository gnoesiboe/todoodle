import TodoList from './../todoList';
import uuid from 'uuid';

/**
 * @param {Number} externalId
 * @param {String} token
 * @param {String} createdAt
 *
 * @return {TodoList}
 *
 * @private
 */
var _createModel = function (externalId, token, createdAt) {
    return new TodoList(
        uuid(),
        externalId,
        token,
        createdAt
    )
};

/**
 * @param {Object} apiData
 *
 * @return {TodoList}
 */
export function createFromApiData(apiData) {
    return _createModel(
        apiData.id,
        apiData.token,
        apiData.createdAt
    )
}
