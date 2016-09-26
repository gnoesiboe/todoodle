import TodoListItemCollection from './../collection/todoListItemCollection';
import * as actionType from './../model/actionType';
import { validatePropertyPathExists } from './../helper/objectHelper';
import _ from 'lodash';
import { createCollectionFromApiInput, createFromApiInput, createModel } from './../model/factory/todoListItemFactory';

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
var _handleImportOfUpdatedTodoListItemAction = function (currentState, action) {
    var unexpectedResponseMessage = 'Unexpected api response format';

    validatePropertyPathExists(action, 'payload.apiData.results', unexpectedResponseMessage);

    var results = action.payload.apiData.results;

    if (!_.isArray(results) || typeof results[0] === 'undefined') {
        throw new Error('Unexpected api response format');
    }

    var result = results[0];

    validatePropertyPathExists(result, 'todoListItem', unexpectedResponseMessage);

    var incomingTodoListItem = createFromApiInput(result.todoListItem);

    var index = currentState.getIndexByExternalId(incomingTodoListItem.externalId);

    if (index === -1) {
        throw new Error(`Handling action '${action.type}' for non existent todo list item with external id: ${incomingTodoListItem.externalId}`);
    }

    var newTodoListItem = currentState.getOneWithIndex(index).clone();

    newTodoListItem.title = incomingTodoListItem.title;

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
var _handleCreateTodoListItemImportAction = function (currentState, action) {
    var unexpectedResponseMessage = 'Unexpected api response format';

    validatePropertyPathExists(action, 'payload.apiData.externalReference', unexpectedResponseMessage);

    var id = action.payload.apiData.externalReference;

    validatePropertyPathExists(action, 'payload.apiData.results', unexpectedResponseMessage);

    var results = action.payload.apiData.results;

    if (!_.isArray(results) || typeof results[0] === 'undefined') {
        throw new Error('Unexpected api response format');
    }

    var result = results[0];

    validatePropertyPathExists(result, 'todoListItem', unexpectedResponseMessage);

    var incomingTodoListItem = createFromApiInput(result.todoListItem),
        atIndex = currentState.getIndexById(id);

    if (atIndex === -1) {
        throw new Error(`Handling action '${action.type}' for non existent todo list item with external id: ${incomingTodoListItem.externalId}`);
    }

    return currentState.mergeAtIndex(atIndex, incomingTodoListItem);
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
 * @return {TodoListItemCollection}
 *
 * @private
 */
var _handleTodoListItemStartAction = function (currentState, action) {
    var newTodo = createModel(action.payload.id, action.payload.title);

    return currentState.addItem(newTodo);
};

/**
 * @param {TodoListItemCollection} currentState
 * @param {Object} action
 *
 * @return {TodoListItemCollection}
 *
 * @private
 */
var _handleEditTodoListItemStartAction = function (currentState, action) {
    var index = currentState.getIndexById(action.payload.id);

    if (index === -1) {
        throw new Error(`Handling action '${action.type}' for non existent todo list item with  id: ${action.payload.id}`);
    }

    var newTodoListItem = currentState.getOneWithIndex(index).clone();

    newTodoListItem.title = action.payload.title;

    return currentState.insertAtIndex(index, newTodoListItem);
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
            return _handleImportOfUpdatedTodoListItemAction(currentState, action);

        case actionType.REMOVE_TODO_LIST_ITEM_START:
            return _handleRemoveTodoListItemStart(currentState, action);

        case actionType.CREATE_TODO_LIST_ITEM_START:
            return _handleTodoListItemStartAction(currentState, action);

        case actionType.CREATE_TODO_LIST_ITEM_IMPORT:
            return _handleCreateTodoListItemImportAction(currentState, action);

        case actionType.EDIT_TODO_LIST_ITEM_START:
            return _handleEditTodoListItemStartAction(currentState, action);
    }

    return currentState;
}
