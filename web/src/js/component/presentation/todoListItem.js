import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListItem extends React.Component {

    /**
     * @private
     */
    _onCheckedChange() {
        if (!this.props.externalId) {
            console.warn('Item is not yet saved on the server');

            return;
        }

        this.props.onCheckedChange(this.props.id, this.props.externalId, !this.props.checked);
    }

    /**
     * @param {Event} event
     *
     * @private
     */
    _onRemoveClick(event) {
        event.preventDefault();

        if (!this.props.externalId) {
            console.warn('Item is not yet saved on the server');

            return;
        }

        if (confirm('Are you sure?!')) {
            this.props.onRemove(this.props.id, this.props.externalId);
        }
    }

    /**
     * @returns {XML}
     */
    render() {
        var { id, checked, title } = this.props,
            checkboxId = `todo_list_item_${id}_checkbox`;

        return (
            <tr className="todo-list-item">
                <td>
                    <input
                        type="checkbox"
                        onChange={ this._onCheckedChange.bind(this) }
                        className="todo-list-item-checked"
                        id={ checkboxId }
                        checked={ checked }
                    />
                </td>
                <td>
                    <label className="todo-list-item-title" htmlFor={ `todo_list_item_${id}_checkbox` }>{ title }</label>
                </td>
                <td>
                    <a href="#" onClick={ this._onRemoveClick.bind(this) } className="todo-list-item-remove">x</a>
                </td>
            </tr>
        );
    }
}

TodoListItem.defaultProps = {
    isChecked: false,
    externalId: null
};

TodoListItem.propTypes = {
    id: React.PropTypes.string.isRequired,
    externalId: React.PropTypes.number,
    title: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool.isRequired,
    onCheckedChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
};

export default TodoListItem;
