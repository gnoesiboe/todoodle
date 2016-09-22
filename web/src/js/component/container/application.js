import React from 'react';
import * as reactRedux from 'react-redux';
import * as stateNamespace from './../../model/stateNamespace';
import { createImportTodoListAction } from './../../model/factory/actionFactory';
import TodoList from './../presentation/todoList';
import * as actionFactory from './../../model/factory/actionFactory';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class Application extends React.Component {

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this.props.dispatch(
            createImportTodoListAction(this.props.todoListExternalId, this.props.todoListToken)
        );
    }

    /**
     * @param {String} id
     * @param {Number} externalId
     * @param {Boolean} newChecked
     *
     * @private
     */
    _onTodoCheckedChange(id, externalId, newChecked) {
        var todoList = this.props.current.get('todoList');

        var action = newChecked
            ? actionFactory.createCheckTodoListItemAction(todoList.externalId, todoList.token, id, externalId)
            : actionFactory.createUncheckTodoListItemAction(todoList.externalId, todoList.token, id, externalId);

        this.props.dispatch(action);
    }

    /**
     * @returns {XML}
     */
    render() {
        var { current, todoListItems } = this.props,
            todoList = current.get('todoList');

        return (
            <div className="row">
                <div className="col-sm-12">
                    <TodoList
                        items={ todoListItems }
                        onTodoCheckedChange={ this._onTodoCheckedChange.bind(this) }
                    />
                </div>
            </div>
        );
    }
}

Application.propTypes = {
    current: React.PropTypes.object.isRequired,
    todoListExternalId: React.PropTypes.number.isRequired,
    todoListToken: React.PropTypes.string.isRequired
};

/**
 * Takes the whole store state and maps it to the application component properties to supply
 * it with the information it needs, and to detach the component from the store.
 *
 * @param {Object} completeState
 *
 * @returns {Object}
 */
var mapCompleteStateToApplicationProps = function (completeState) {
    return {
        current: completeState[stateNamespace.CURRENT],
        todoListItems: completeState[stateNamespace.TODO_LIST_ITEMS]
    }
};

export default reactRedux.connect(mapCompleteStateToApplicationProps)(Application);
