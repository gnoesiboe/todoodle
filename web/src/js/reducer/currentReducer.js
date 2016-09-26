import * as actionType from './../model/actionType';
import * as todoListFactory from './../model/factory/todoListFactory';
import { validatePropertyPathExists } from './../helper/objectHelper';
import _ from 'lodash';
import CurrentMap from './../map/currentMap';

/**
 * @type {CurrentMap}
 *
 * @private
 */
var _defaultState = new CurrentMap();

/**
 * @param {CurrentMap} currentState
 *
 * @param {Object} action
 *
 * @returns {CurrentMap}
 *
 * @private
 */
var _handleImportTodoListImportAction = function (currentState, action) {
    var unexpectedResponseMessage = 'Unexpected api response format';

    validatePropertyPathExists(action, 'payload.apiData.results', unexpectedResponseMessage);

    var results = action.payload.apiData.results;

    if (!_.isArray(results) || typeof results[0] === 'undefined') {
        throw new Error('Unexpected api response format');
    }

    var result = results[0];

    validatePropertyPathExists(result, 'todoList', unexpectedResponseMessage);

    return currentState.setTodoList(
        todoListFactory.createFromApiData(result.todoList)
    );
};

/**
 * @param {CurrentMap} currentState
 *
 * @param {Object} action
 *
 * @returns {CurrentMap}
 */
export default function currentReducer(currentState = _defaultState, action) {
    switch (action.type) {
        case actionType.IMPORT_TODO_LIST_IMPORT:
            return _handleImportTodoListImportAction(currentState, action);

        case actionType.SET_CURRENT_TODO_LIST_ITEM:
            return currentState.setTodoListItemId(action.payload.id);
    }

    return currentState;
}
