import uuid from 'uuid';
import * as actionType from './../actionType';
import * as apiClient from './../../client/apiClient';
import * as stateNamespace from './../../model/stateNamespace';

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
            });
    }
}

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
 * @param {Object} apiData
 *
 * @returns {Object}
 *
 * @private
 */
var _createCheckTodoListItemImportAction = function (id, apiData) {
    return _createAction(actionType.CHECK_TODO_LIST_ITEM_IMPORT, {
        id: id,
        apiData: apiData
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
var _createCheckTodoListItemStopAction = function (id, error = null) {
    return _createAction(actionType.CHECK_TODO_LIST_ITEM_STOP, {
        id: id,
        error: error
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

        apiClient.checkTodoListItem(externalTodoListId, todoListToken, externalId)
            .then((apiData) => {
                dispatch(_createCheckTodoListItemImportAction(id, apiData));
                dispatch(_createCheckTodoListItemStopAction(id));
            })
            .catch((error) => {
                dispatch(_createCheckTodoListItemStopAction(id, error));
            });
    }
}

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
 * @param {String} id
 * @param {Object} apiData
 *
 * @returns {Object}
 *
 * @private
 */
var _createUncheckTodoListItemImportAction = function (id, apiData) {
    return _createAction(actionType.UNCHECK_TODO_LIST_ITEM_IMPORT, {
        id: id,
        apiData: apiData
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
var _createUncheckTodoListItemStopAction = function (id, error = null) {
    return _createAction(actionType.UNCHECK_TODO_LIST_ITEM_STOP, {
        id: id,
        error: error
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
export function createUncheckTodoListItemAction(externalTodoListId, todoListToken, id, externalId) {
    return function (dispatch) {
        dispatch(_createUncheckTodoListItemStartAction(id));

        apiClient.uncheckTodoListItem(externalTodoListId, todoListToken, externalId)
            .then((apiData) => {
                dispatch(_createUncheckTodoListItemImportAction(id, apiData));
                dispatch(_createUncheckTodoListItemStopAction(id));
            })
            .catch((error) => {
                dispatch(_createUncheckTodoListItemStopAction(id, error));
            });
    }
}

/**
 * @param {String} id
 *
 * @returns {Object}
 *
 * @private
 */
var _createRemoveTodoListItemStartAction = function (id) {
    return _createAction(actionType.REMOVE_TODO_LIST_ITEM_START, {
        id: id
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
var _createRemoveTodoListItemStopAction = function (id, error = null) {
    return _createAction(actionType.REMOVE_TODO_LIST_ITEM_STOP, {
        id: id,
        error: error
    })
};

/**
 * @param {Number} externalTodoListId
 * @param {String} todoListToken
 * @param {String} id
 * @param {Number} externalId
 *
 * @returns {Function}
 */
export function createRemoveTodoListItemAction(externalTodoListId, todoListToken, id, externalId) {
    return function (dispatch) {
        dispatch(_createRemoveTodoListItemStartAction(id));

        apiClient.removeTodoListItem(externalTodoListId, todoListToken, externalId)
            .then(() => {
                dispatch(_createRemoveTodoListItemStopAction(id));
            })
            .catch((error) => {
                dispatch(_createRemoveTodoListItemStopAction(id, error));
            });
    }
}

/**
 * @param {String} id
 * @param {String} title
 *
 * @returns {Object}
 *
 * @private
 */
var _createCreateTodoListItemStartAction = function (id, title) {
    return _createAction(actionType.CREATE_TODO_LIST_ITEM_START, {
        id: id,
        title: title
    });
};

/**
 * @param {String} id
 * @param {Object} apiData
 *
 * @returns {Object}
 *
 * @private
 */
var _createCreateTodoListItemImportAction = function (id, apiData) {
    return _createAction(actionType.CREATE_TODO_LIST_ITEM_IMPORT, {
        id: id,
        apiData: apiData
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
var _createCreateTodoListItemStopAction = function (id, error = null) {
    return _createAction(actionType.CREATE_TODO_LIST_ITEM_STOP, {
        id: id,
        error: error
    });
};

/**
 * @param {Number} externalTodoListId
 * @param {String} todoListToken
 * @param {String} title
 *
 * @returns {Function}
 */
export function createCreateTodoListItemAction(externalTodoListId, todoListToken, title) {
    var id = uuid();

    return function (dispatch) {
        dispatch(_createCreateTodoListItemStartAction(id, title));

        apiClient.createTodoListItem(externalTodoListId, todoListToken, title, id)
            .then((apiData) => {
                dispatch(_createCreateTodoListItemImportAction(id, apiData));
                dispatch(_createCreateTodoListItemStopAction(id));
            })
            .catch((error) => {
                dispatch(_createCreateTodoListItemStopAction(id, error));
            });
    }
}

/**
 * @param {String} id
 * @param {String} title
 *
 * @returns {Object}
 *
 * @private
 */
var _createEditTodoListItemStartAction = function (id, title) {
    return _createAction(actionType.EDIT_TODO_LIST_ITEM_START, {
        id: id,
        title: title
    });
};

/**
 * @param {String} id
 * @param {Object} apiData
 *
 * @returns {Object}
 *
 * @private
 */
var _createEditTodoListItemImportAction = function (id, apiData) {
    return _createAction(actionType.EDIT_TODO_LIST_ITEM_IMPORT, {
        id: id,
        apiData: apiData
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
var _createEditTodoListItemStopAction = function (id, error = null) {
    return _createAction(actionType.EDIT_TODO_LIST_ITEM_STOP, {
        id: id,
        error: error
    });
};

/**
 * @param {Number} externalTodoListId
 * @param {String} todoListToken
 * @param {String} id
 * @param {Number} externalTodoListItemId
 * @param {String} title
 */
export function createEditTodoListItemAction(externalTodoListId, todoListToken, id, externalTodoListItemId, title) {
    return function (dispatch) {
        dispatch(_createEditTodoListItemStartAction(id, title));

        apiClient.editTodoListItem(externalTodoListId, todoListToken, externalTodoListItemId, title)
            .then((apiData) => {
                dispatch(_createEditTodoListItemImportAction(id, apiData));
                dispatch(_createEditTodoListItemStopAction(id));
            })
            .catch((error) => {
                dispatch(_createEditTodoListItemStopAction(id, error));
            });
    };
}

/**
 * @param {String} id
 *
 * @returns {Object}
 */
export function createSetCurrentTodoListItemAction(id) {
    return _createAction(actionType.SET_CURRENT_TODO_LIST_ITEM, {
        id: id
    })
}

/**
 * @returns {Function}
 */
export function createSelectPreviousTodoListItem() {
    return function (dispatch, getState) {
        var state = getState(),
            current = state[stateNamespace.CURRENT],
            todoListItems = state[stateNamespace.TODO_LIST_ITEMS];

        if (todoListItems.count() === 0) {
            return;
        }

        var currentTodoListItemId = current.todoListItemId;

        if (currentTodoListItemId === null) {
            dispatch(
                createSetCurrentTodoListItemAction(
                    todoListItems.last().id
                )
            );
        } else {
            var currentIndex = todoListItems.getIndexById(currentTodoListItemId),
                previousIndex = currentIndex > 0 ? currentIndex - 1 : todoListItems.count() - 1;

            console.log(currentIndex, previousIndex);

            dispatch(
                createSetCurrentTodoListItemAction(
                    todoListItems.getOneWithIndex(previousIndex).id
                )
            )
        }
    }
}

/**
 * @returns {Function}
 */
export function createSelectNextTodoListItem() {
    return function (dispatch, getState) {
        var state = getState(),
            current = state[stateNamespace.CURRENT],
            todoListItems = state[stateNamespace.TODO_LIST_ITEMS];

        if (todoListItems.count() === 0) {
            return;
        }

        var currentTodoListItemId = current.todoListItemId;

        if (currentTodoListItemId === null) {
            dispatch(
                createSetCurrentTodoListItemAction(
                    todoListItems.first().id
                )
            )
        } else {
            var currentIndex = todoListItems.getIndexById(currentTodoListItemId),
                nextIndex = todoListItems.hasIndex(currentIndex + 1) ? currentIndex + 1 : 0;

            dispatch(
                createSetCurrentTodoListItemAction(
                    todoListItems.getOneWithIndex(nextIndex).id
                )
            )
        }
    }
}
