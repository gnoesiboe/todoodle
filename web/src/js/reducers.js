import { combineReducers } from 'redux';
import * as stateNamespace from './model/stateNamespace';
import currentReducer from './reducer/currentReducer';

var reducers = combineReducers({
    [stateNamespace.CURRENT]: currentReducer
});

export default reducers;
