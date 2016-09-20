import * as actionType from './../model/actionType';
import { Map } from 'immutable';
import * as todoListFactory from './../model/factory/todoListFactory';

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
 */
export default function currentReducer(currentState = _defaultState, action) {
    switch (action.type) {
        case actionType.IMPORT_TODO_LIST_IMPORT:
            return currentState.set('todoList', todoListFactory.createFromApiData(action.payload.apiData.results[0].todoList))
    }

    return currentState;
}
