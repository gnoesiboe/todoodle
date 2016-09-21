import * as actionType from './../model/actionType';
import { Map } from 'immutable';
import * as todoListFactory from './../model/factory/todoListFactory';
import { validatePropertyPathExists } from './../helper/objectHelper';
import _ from 'lodash';

/**
 * @type {Map}
 *
 * @private
 */
var _defaultState = Map({
    todoList: null
});

/**
 * @param {Map} currentState
 *
 * @param {Object} action
 *
 * @returns {Map}
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

    return currentState.set(
        'todoList',
        todoListFactory.createFromApiData(result.todoList)
    );
};

/**
 * @param {Map} currentState
 *
 * @param {Object} action
 *
 * @returns {Map}
 */
export default function currentReducer(currentState = _defaultState, action) {
    switch (action.type) {
        case actionType.IMPORT_TODO_LIST_IMPORT:
            return _handleImportTodoListImportAction(currentState, action);
    }

    return currentState;
}
