import React from 'react';
import TodoListItemCollection from './../../collection/todoListItemCollection';

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
                            <div className="row">
                                <form className="form-inline">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" />
                                            <span>{ todoListItem.title }</span>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </li>
                    );
                }) }
            </ul>
        );
    }
}

TodoList.propTypes = {
    items: React.PropTypes.instanceOf(TodoListItemCollection).isRequired
};

export default TodoList;
