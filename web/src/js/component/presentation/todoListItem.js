import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListItem extends React.Component {

    /**
     * @private
     */
    _onCheckedChange() {
        this.props.onCheckedChange(this.props.id, this.props.externalId, !this.props.checked);
    }

    /**
     * @returns {XML}
     */
    render() {
        var { checked, title } = this.props;

        return (
            <div className="row todo-list-item">
                <form className="form-inline">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                onChange={ this._onCheckedChange.bind(this) }
                                className="todo-list-item-checked"
                                checked={ checked }
                            />
                            <span className="todo-list-item-title">{ title }</span>
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

TodoListItem.defaultProps = {
    isChecked: false
};

TodoListItem.propTypes = {
    id: React.PropTypes.string.isRequired,
    externalId: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool.isRequired,
    onCheckedChange: React.PropTypes.func.isRequired
};

export default TodoListItem;
