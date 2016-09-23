import React from 'react';
import TodoListItemCollection from './../../collection/todoListItemCollection';
import TodoListItem from './todoListItem';

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
                        <th className="todo-list-thead-checked">#</th>
                        <th>Task</th>
                        <th className="todo-list-thead-actions" />
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
                                checked={ todoListItem.checked }
                                onCheckedChange={ this.props.onTodoCheckedChange }
                                onRemove={ this.props.onTodoListItemRemove }
                            />
                        );
                    }) }
                </tbody>
            </table>
        );
    }
}

TodoList.propTypes = {
    items: React.PropTypes.instanceOf(TodoListItemCollection).isRequired,
    onTodoCheckedChange: React.PropTypes.func.isRequired, //@todo rename to onTodoListItemCheckedChange
    onTodoListItemRemove: React.PropTypes.func.isRequired
};

export default TodoList;
