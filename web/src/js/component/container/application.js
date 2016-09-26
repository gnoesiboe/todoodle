import React from 'react';
import * as reactRedux from 'react-redux';
import * as stateNamespace from './../../model/stateNamespace';
import { createImportTodoListAction } from './../../model/factory/actionFactory';
import TodoList from './../presentation/todoList';
import * as actionFactory from './../../model/factory/actionFactory';
import * as keyboardListener from './../../listener/keyboardListener';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class Application extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this._keyboardBindingIds = [];
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this._requestTodoList();
        this._bindKeyboardShortcuts();
    }

    /**
     * @private
     */
    _bindKeyboardShortcuts() {
        this._keyboardBindingIds.push(
            keyboardListener.bind(['j', 'down'], this._onNextKeyboardBindingPressed.bind(this))
        );
    }

    /**
     * @private
     */
    _onNextKeyboardBindingPressed() {
        this.props.dispatch(
            actionFactory.createSelectNextTodoListItem()
        )
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        keyboardListener.unbindBatch(this._keyboardBindingIds);
    }

    /**
     * @private
     */
    _requestTodoList() {
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
     *
     * @todo rename to _onTodoListItemCheckedChange
     */
    _onTodoCheckedChange(id, externalId, newChecked) {
        var todoList = this.props.current.todoList;

        var action = newChecked
            ? actionFactory.createCheckTodoListItemAction(todoList.externalId, todoList.token, id, externalId)
            : actionFactory.createUncheckTodoListItemAction(todoList.externalId, todoList.token, id, externalId);

        this.props.dispatch(action);
    }

    /**
     * @param {String} id
     * @param {Number} externalId
     *
     * @private
     */
    _onTodoListItemRemove(id, externalId) {
        var todoList = this.props.current.todoList;

        this.props.dispatch(
            actionFactory.createRemoveTodoListItemAction(todoList.externalId, todoList.token, id, externalId)
        );
    }

    /**
     * @param {String} title
     *
     * @private
     */
    _onTodoListItemCreate(title) {
        var todoList = this.props.current.todoList;

        this.props.dispatch(
            actionFactory.createCreateTodoListItemAction(todoList.externalId, todoList.token, title)
        );
    }

    /**
     * @param {String} id
     * @param {Number} externalId
     * @param {String} title
     *
     * @private
     */
    _onTodoListItemEdit(id, externalId, title) {
        var todoList = this.props.current.todoList;

        this.props.dispatch(
            actionFactory.createEditTodoListItemAction(todoList.externalId, todoList.token, id, externalId, title)
        );
    }

    /**
     * @param {String} id
     *
     * @private
     */
    _onTodoListItemClick(id) {
        this.props.dispatch(
            actionFactory.createSetCurrentTodoListItemAction(id)
        )
    }

    /**
     * @returns {XML}
     */
    render() {
        var { current, todoListItems } = this.props,
            currentTodoListItemId = current.todoListItemId;

        return (
            <div className="row">
                <div className={ currentTodoListItemId ? 'col-sm-6' : 'col-sm-12' }>
                    <TodoList
                        items={ todoListItems }
                        onTodoCheckedChange={ this._onTodoCheckedChange.bind(this) }
                        onTodoListItemRemove={ this._onTodoListItemRemove.bind(this) }
                        onTodoListItemCreate={ this._onTodoListItemCreate.bind(this) }
                        onTodoListItemEdit={ this._onTodoListItemEdit.bind(this) }
                        onTodoListItemClick={ this._onTodoListItemClick.bind(this) }
                        currentTodoListItemId={ currentTodoListItemId }
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
