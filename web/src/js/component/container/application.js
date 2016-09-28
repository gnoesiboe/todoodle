import React from 'react';
import * as reactRedux from 'react-redux';
import * as stateNamespace from './../../model/stateNamespace';
import { createImportTodoListAction } from './../../model/factory/actionFactory';
import TodoList from './../presentation/todoList';
import TodoListDetail from './../presentation/todoListDetail';
import * as actionFactory from './../../model/factory/actionFactory';
import * as keyboardListener from './../../listener/keyboardListener';
import EditTodoListItemForm from './../presentation/editTodoListItemForm';

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
            keyboardListener.bind(['j', 'down'], this._onNextKeyboardBindingPressed.bind(this)),
            keyboardListener.bind(['k', 'up'], this._onPreviousKeyboardBindingPressed.bind(this)),
            keyboardListener.bind('e', this._onEditCurrentKeyboardBindingPressed.bind(this)),
            keyboardListener.bind('space', this._onToggleCheckedKeyboardBindingPressed.bind(this)),
            keyboardListener.bind('x', this._onRemoveKeyboardBindingPressed.bind(this))
        );
    }

    /**
     * @private
     */
    _onToggleCheckedKeyboardBindingPressed() {
        this.props.dispatch(
            actionFactory.createToggleCheckedForCurrentTodoListItemAction()
        );
    }

    /**
     * @private
     */
    _onRemoveKeyboardBindingPressed() {
        if (confirm('Are you sure you want to delete the current item?!')) {
            this.props.dispatch(
                actionFactory.createRemoveCurrentTodoListItemAction()
            );
        }
    }

    /**
     * @param {Event} event
     * @private
     */
    _onEditCurrentKeyboardBindingPressed(event) {

        // prevent typing in edit title field
        event.preventDefault();

        this.props.dispatch(
            actionFactory.createEditCurrentTodoListItemAction()
        );
    }

    /**
     * @private
     */
    _onPreviousKeyboardBindingPressed() {
        this.props.dispatch(
            actionFactory.createSelectPreviousTodoListItemAction()
        );
    }

    /**
     * @private
     */
    _onNextKeyboardBindingPressed() {
        this.props.dispatch(
            actionFactory.createSelectNextTodoListItemAction()
        );
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
        if (confirm('Are you sure you want to delete this item?!')) {
            var todoList = this.props.current.todoList;

            this.props.dispatch(
                actionFactory.createRemoveTodoListItemAction(todoList.externalId, todoList.token, id, externalId)
            );
        }
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
     * @param {String} title
     * @param {String} description
     *
     * @private
     */
    _onTodoListItemEdit(title, description) {
        var todoList = this.props.current.todoList,
            todoListItemId = this.props.current.todoListItemId;

        if (todoListItemId === null) {
            return null;
        }

        var todoListItem = this.props.todoListItems.getOneById(todoListItemId);

        if (!todoListItem) {
            return null;
        }

        this.props.dispatch(
            actionFactory.createEditTodoListItemAction(
                todoList.externalId,
                todoList.token,
                todoListItem.id,
                todoListItem.externalId,
                title,
                description
            )
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
     * @param {String} id
     *
     * @private
     */
    _onTodoListItemEditStart(id) {
        this.props.dispatch(
            actionFactory.createStartEditTodoListItemAction(id)
        );
    }

    /**
     * @param {String} id
     *
     * @private
     */
    _onTodoListItemEditCancel(id) {
        this.props.dispatch(
            actionFactory.createCancelEditTodoListItemAction(id)
        );
    }

    /**
     * @param {TodoListItem} todoListItem
     *
     * @returns {XML}
     *
     * @private
     */
    static _renderTodoListDetail(todoListItem) {
        return (
            <TodoListDetail
                title={ todoListItem.title }
                description={ todoListItem.description }
            />
        );
    }

    /**
     * @param {TodoListItem} todoListItem
     *
     * @returns {XML}
     *
     * @private
     */
    _renderEditTodoListItemForm(todoListItem) {
        return (
            <EditTodoListItemForm
                id={ todoListItem.id }
                title={ todoListItem.title }
                description={ todoListItem.description }
                onEdit={ this._onTodoListItemEdit.bind(this) }
                onCancel={ this._onTodoListItemEditCancel.bind(this) }
            />
        );
    }

    /**
     * @returns {XML|null}
     *
     * @private
     */
    _renderDetailView() {
        var { current, todoListItems } = this.props,
            currentTodoListItemId = current.todoListItemId;

        if (currentTodoListItemId === null) {
            return null;
        }

        var currentTodoListItem = todoListItems.getOneById(currentTodoListItemId);

        if (!currentTodoListItem) {
            return null;
        }

        var isBeingEdited = current.editingTodoListItemId === currentTodoListItemId;

        if (isBeingEdited) {

        }

        return (
            <div className="col-sm-6">
                { isBeingEdited
                    ? this._renderEditTodoListItemForm(currentTodoListItem)
                    : Application._renderTodoListDetail(currentTodoListItem)
                }
            </div>
        );
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
                        editingTodoListItemId={ current.editingTodoListItemId }
                        onTodoCheckedChange={ this._onTodoCheckedChange.bind(this) }
                        onTodoListItemRemove={ this._onTodoListItemRemove.bind(this) }
                        onTodoListItemCreate={ this._onTodoListItemCreate.bind(this) }
                        onTodoListItemEdit={ this._onTodoListItemEdit.bind(this) }
                        onTodoListItemClick={ this._onTodoListItemClick.bind(this) }
                        onTodoListItemEditStart={ this._onTodoListItemEditStart.bind(this) }
                        onTodoListItemEditCancel={ this._onTodoListItemEditCancel.bind(this) }
                        currentTodoListItemId={ currentTodoListItemId }
                    />
                </div>
                { this._renderDetailView() }
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
