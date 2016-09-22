import uuid from 'uuid';
import * as actionType from './../actionType';
import * as apiClient from './../../client/apiClient';

/**
 * @param {String} type
 * @param {Object=} payload
 *
 * @returns {Object}
 *
 * @private
 */
var _createAction = function (type, payload = {}) {
    return {
        type: type,
        payload: payload
    };
};

/**
 * @param {String} id
 * @param {Number} externalId
 *
 * @private
 */
var _createImportTodoListStartAction = function (id, externalId) {
    return _createAction(actionType.IMPORT_TODO_LIST_START, {
        id: id,
        externalId: externalId
    });
};

/**
 * @param {String} id
 * @param {Error=} error
 *
 * @returns {Object}
 *
 * @private
 */
var _createImportTodoListStopAction = function (id, error = null) {
    return _createAction(actionType.IMPORT_TODO_LIST_STOP, {
        id: id,
        error: error
    })
};

/**
 * @param {String} id
 * @param {Object} apiData
 *
 * @returns {Object}
 *
 * @private
 */
var _createImportTodoListImportAction = function (id, apiData) {
    return _createAction(actionType.IMPORT_TODO_LIST_IMPORT, {
        id: id,
        apiData: apiData
    });
};

/**
 * @param {String} id
 *
 * @returns {Object}
 *
 * @private
 */
var _createCheckTodoListItemStartAction = function (id) {
    return _createAction(actionType.CHECK_TODO_LIST_ITEM_START, {
        id: id
    });
};

/**
 * @param {String} id
 *
 * @returns {Object}
 *
 * @private
 */
var _createUncheckTodoListItemStartAction = function (id) {
    return _createAction(actionType.UNCHECK_TODO_LIST_ITEM_START, {
        id: id
    });
};

/**
 * @param {Number} externalTodoListId
 * @param {String} todoListToken
 * @param {String} id
 * @param {Number} externalId
 *
 * @returns {Function}
 */
export function createCheckTodoListItemAction(externalTodoListId, todoListToken, id, externalId) {
    return function (dispatch) {
        dispatch(_createCheckTodoListItemStartAction(id));

        //@todo api save
    }
}

/**
 * @param {Number} externalTodoListId
 * @param {String} todoListToken
 * @param {String} id
 * @param {Number} externalId
 *
 * @returns {Function}
 */
export function createUncheckTodoListItemAction(externalTodoListId, todoListToken, id, externalId) {
    return function (dispatch) {
        dispatch(_createUncheckTodoListItemStartAction(id));

        //@todo api save
    }
}

/**
 * @param {Number} externalId
 * @param {String} token
 *
 * @returns {Function}
 */
export function createImportTodoListAction(externalId, token) {
    return function (dispatch) {
        var id = uuid();

        dispatch(_createImportTodoListStartAction(id, externalId));

        apiClient.getTodoList(externalId, token)
            .then((apiData) => {
                dispatch(_createImportTodoListImportAction(id, apiData));
                dispatch(_createImportTodoListStopAction(id));
            })
            .catch((error) => {
                dispatch(_createImportTodoListStopAction(id, error));
            })
    }
}
