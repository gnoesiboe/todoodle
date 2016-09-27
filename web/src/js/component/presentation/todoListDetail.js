import React from 'react';
import showdown from 'showdown';

var _showdownConverter = new showdown.Converter();

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListDetail extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        var { title, description } = this.props;

        return (
            <div className="todo-list-detail">
                <h1 className="todo-list-detail-title">{ title }</h1>
                <div dangerouslySetInnerHTML={{ __html: _showdownConverter.makeHtml(description) }} />
            </div>
        );
    }
}

TodoListDetail.defaultProps = {
    description: null
};

TodoListDetail.propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
};

export default TodoListDetail;
