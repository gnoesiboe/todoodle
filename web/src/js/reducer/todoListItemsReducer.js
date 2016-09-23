import TodoListItemCollection from './../collection/todoListItemCollection';
import * as actionType from './../model/actionType';
import { validatePropertyPathExists } from './../helper/objectHelper';
import _ from 'lodash';
import { createCollectionFromApiInput, createFromApiInput } from './../model/factory/todoListItemFactory';

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
 * @return {TodoListItemCollection}
 *
 * @private
 */
var _handleCheckTodoListItemStartAction = function (currentState, action) {
    var index = currentState.getIndexById(action.payload.id);

    if (index === -1) {
        throw new Error(`Handling action for non existent todo list item with id: ${id}`);
    }

    var newTodoListItem = currentState.getOneWithIndex(index).clone();

    newTodoListItem.checked = true;

    return currentState.insertAtIndex(index, newTodoListItem);
};

/**
 * @param {TodoListItemCollection} currentState
 * @param {Object} action
 *
 * @return {TodoListItemCollection}
 *
 * @private
 */
var _handleUncheckTodoListItemStartAction = function (currentState, action) {
    var index = currentState.getIndexById(action.payload.id);

    if (index === -1) {
        throw new Error(`Handling action for non existent todo list item with id: ${id}`);
    }

    var newTodoListItem = currentState.getOneWithIndex(index).clone();

    newTodoListItem.checked = false;

    return currentState.insertAtIndex(index, newTodoListItem);
};

/**
 * @param {TodoListItemCollection} currentState
 * @param {Object} action
 *
 * @return {TodoListItemCollection}
 *
 * @private
 */
var _handleImportTodoListItemAction = function (currentState, action) {
    var unexpectedResponseMessage = 'Unexpected api response format';

    validatePropertyPathExists(action, 'payload.apiData.results', unexpectedResponseMessage);

    var results = action.payload.apiData.results;

    if (!_.isArray(results) || typeof results[0] === 'undefined') {
        throw new Error('Unexpected api response format');
    }

    var result = results[0];

    validatePropertyPathExists(result, 'todoListItem', unexpectedResponseMessage);

    var todoListItem = createFromApiInput(result.todoListItem);

    var index = currentState.getIndexByExternalId(todoListItem.externalId);

    if (index === -1) {
        throw new Error(`Handling action '${action.type}' for non existent todo list item with external id: ${todoListItem.externalId}`);
    }

    return currentState.insertAtIndex(index, todoListItem);
};

/**
 * @param {TodoListItemCollection} currentState
 * @param {Object} action
 *
 * @return {TodoListItemCollection}
 *
 * @private
 */
var _handleRemoveTodoListItemStart = function (currentState, action) {
    var index = currentState.getIndexById(action.payload.id);

    if (index === -1) {
        throw new Error(`Handling action '${action.type}' for non existent todo list item with  id: ${action.payload.id}`);
    }

    return currentState.removeAtIndex(index);
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

        case actionType.CHECK_TODO_LIST_ITEM_START:
            return _handleCheckTodoListItemStartAction(currentState, action);

        case actionType.UNCHECK_TODO_LIST_ITEM_START:
            return _handleUncheckTodoListItemStartAction(currentState, action);

        case actionType.CHECK_TODO_LIST_ITEM_IMPORT:
        case actionType.UNCHECK_TODO_LIST_ITEM_IMPORT:
            return _handleImportTodoListItemAction(currentState, action);

        case actionType.REMOVE_TODO_LIST_ITEM_START:
            return _handleRemoveTodoListItemStart(currentState, action);
    }

    return currentState;
}
