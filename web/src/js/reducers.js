import { combineReducers } from 'redux';
import * as stateNamespace from './model/stateNamespace';
import currentReducer from './reducer/currentReducer';
import todoListItemsReducer from './reducer/todoListItemsReducer';

var reducers = combineReducers({
    [stateNamespace.CURRENT]: currentReducer,
    [stateNamespace.TODO_LIST_ITEMS]: todoListItemsReducer
});

export default reducers;
