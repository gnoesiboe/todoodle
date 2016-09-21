import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListItem extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="row">
                <form className="form-inline">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked={ this.props.checked } />
                            <span>{ this.props.title }</span>
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}

TodoListItem.propTypes = {
    title: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool.isRequired,
};

export default TodoListItem;
