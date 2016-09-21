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
            <div>
                { this.props.items.all().map((todoListItem) => {
                    return (
                        <div className="row" key={ todoListItem.id }>
                            <form className="form-inline">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" />
                                        { todoListItem.title }
                                    </label>
                                </div>
                            </form>
                        </div>
                    );
                }) }
            </div>
        );
    }
}

TodoList.propTypes = {
    items: React.PropTypes.instanceOf(TodoListItemCollection).isRequired
};

export default TodoList;
