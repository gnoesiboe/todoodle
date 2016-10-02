import React from 'react';
import TodoListItemCollection from './../../collection/todoListItemCollection';
import TodoListItem from './todoListItem';
import AddTodoListItemForm from './addTodoListItemForm';
import './../../../scss/component/todoList.scss';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoList extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <td />
                        <td>
                            <AddTodoListItemForm
                                onSubmit={ this.props.onTodoListItemCreate }
                            />
                        </td>
                        <td />
                        <td />
                    </tr>
                </thead>
                <tbody>
                    { this.props.items.all().map((todoListItem) => {
                        return (
                            <TodoListItem
                                key={ todoListItem.id }
                                id={ todoListItem.id }
                                externalId={ todoListItem.externalId }
                                title={ todoListItem.title }
                                deadline={ todoListItem.deadline }
                                checked={ todoListItem.checked }
                                onCheckedChange={ this.props.onTodoCheckedChange }
                                onRemove={ this.props.onTodoListItemRemove }
                                onEditStart={ this.props.onTodoListItemEditStart }
                                onEditCancel={ this.props.onTodoListItemEditCancel }
                                onClick={ this.props.onTodoListItemClick }
                                isCurrent={ todoListItem.id === this.props.currentTodoListItemId }
                            />
                        );
                    }) }
                </tbody>
            </table>
        );
    }
}

TodoList.defaultProps = {
    currentTodoListItemId: null,
    editingTodoListItemId: null
};

TodoList.propTypes = {
    items: React.PropTypes.instanceOf(TodoListItemCollection).isRequired,
    onTodoCheckedChange: React.PropTypes.func.isRequired, //@todo rename to onTodoListItemCheckedChange
    onTodoListItemRemove: React.PropTypes.func.isRequired,
    onTodoListItemCreate: React.PropTypes.func.isRequired,
    onTodoListItemEdit: React.PropTypes.func.isRequired,
    onTodoListItemEditStart: React.PropTypes.func.isRequired,
    onTodoListItemEditCancel: React.PropTypes.func.isRequired,
    onTodoListItemClick: React.PropTypes.func.isRequired,
    currentTodoListItemId: React.PropTypes.string,
    editingTodoListItemId: React.PropTypes.string,
};

export default TodoList;
