import TodoListItemCollection from './../collection/todoListItemCollection';
import * as actionType from './../model/actionType';
import { validatePropertyPathExists } from './../helper/objectHelper';
import _ from 'lodash';
import { createCollectionFromApiInput } from './../model/factory/todoListItemFactory';

/**
 * @type {TodoListItemCollection}
 *
 * @private
 */
var _defaultState = new TodoListItemCollection();

/**
 * @param {TodoListItemCollection} currentState
 * @param {Object} action
 *
 * @return {TodoListItemCollection}
 *
 * @private
 */
var _handleImportTodoListImport = function (currentState, action) {
    var unexpectedResponseMessage = 'Unexpected api response format';

    validatePropertyPathExists(action, 'payload.apiData.results', unexpectedResponseMessage);

    var results = action.payload.apiData.results;

    if (!_.isArray(results) || typeof results[0] === 'undefined') {
        throw new Error('Unexpected api response format');
    }

    var result = results[0];

    validatePropertyPathExists(result, 'todoList.items', unexpectedResponseMessage);

    var todoListItems = result.todoList.items;

    return createCollectionFromApiInput(todoListItems);
};

/**
 * @param {TodoListItemCollection} currentState
 * @param {Object} action
 *
 * @returns {TodoListItemCollection}
 */
export default function todoListItemsReducer(currentState = _defaultState, action) {
    switch (action.type) {
        case actionType.IMPORT_TODO_LIST_IMPORT:
            return _handleImportTodoListImport(currentState, action);
    }

    return currentState;
}
