import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListDetail extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        var { title } = this.props;

        return (
            <div className="todo-list-detail">
                <h1 className="todo-list-detail-title">{ title }</h1>
            </div>
        );
    }
}

TodoListDetail.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default TodoListDetail;
