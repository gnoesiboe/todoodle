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
            <ul className="list-unstyled">
                { this.props.items.all().map((todoListItem) => {
                    return (
                        <li key={ todoListItem.id }>
                            <TodoListItem
                                id={ todoListItem.id }
                                externalId={ todoListItem.externalId }
                                title={ todoListItem.title }
                                checked={ todoListItem.checked }
                                onCheckedChange={ this.props.onTodoCheckedChange }
                            />
                        </li>
                    );
                }) }
            </ul>
        );
    }
}

TodoList.propTypes = {
    items: React.PropTypes.instanceOf(TodoListItemCollection).isRequired,
    onTodoCheckedChange: React.PropTypes.func.isRequired
};

export default TodoList;
