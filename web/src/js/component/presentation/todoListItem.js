import React from 'react';
import classNames from 'classnames';

const MODE_VIEW = 'view';
const MODE_EDIT = 'edit';

import EditTodoListItemForm from './editTodoListItemForm';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListItem extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            mode: MODE_VIEW
        };
    }

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
     * @param {Event} event
     *
     * @private
     */
    _onEditClick(event) {
        event.preventDefault();

        if (!this.props.externalId) {
            console.warn('Item not yet saved on the server');

            return;
        }

        this.setState({
            mode: MODE_EDIT
        });
    }

    /**
     * @private
     */
    _onClick() {
        this.props.onClick(this.props.id);
    }

    /**
     * @returns {XML}
     *
     * @private
     */
    _renderViewMode() {
        var { id, checked, title } = this.props,
            checkboxId = `todo_list_item_${id}_checkbox`;

        return (
            <tr className={ this._defineContainerClassName() } onClick={ this._onClick.bind(this) }>
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
                    <ul className="list-inline">
                        <li>
                            <a href="#" onClick={ this._onEditClick.bind(this) }>e</a>
                        </li>
                        <li>
                            <a href="#" onClick={ this._onRemoveClick.bind(this) }>x</a>
                        </li>
                    </ul>
                </td>
            </tr>
        );
    }

    /**
     * @param {String} title
     *
     * @private
     */
    _onEdit(title) {
        this.props.onEdit(
            this.props.id,
            this.props.externalId,
            title
        );

        this.setState({
            mode: MODE_VIEW
        });
    }

    /**
     * @private
     */
    _onEditCancel() {
        this.setState({
            mode:MODE_VIEW
        });
    }

    /**
     * @returns {XML}
     *
     * @private
     */
    _renderEditMode() {
        return (
            <tr className={ this._defineContainerClassName() }>
                <td />
                <td>
                    <EditTodoListItemForm
                        title={ this.props.title }
                        onEdit={ this._onEdit.bind(this) }
                        onCancel={ this._onEditCancel.bind(this) }
                    />
                </td>
                <td />
            </tr>
        )
    }

    /**
     * @returns {String}
     *
     * @private
     */
    _defineContainerClassName() {
        return classNames({
            'todo-list-item': true,
            'todo-list-item--current': this.props.isCurrent
        });
    }

    /**
     * @returns {XML}
     */
    render() {
        switch (this.state.mode) {
            case MODE_VIEW:
                return this._renderViewMode();

            case MODE_EDIT:
                return this._renderEditMode();

            default:
                throw new Error(`Mode: '${this.state.mode}' not supported`);
        }
    }
}

TodoListItem.defaultProps = {
    isChecked: false,
    externalId: null,
    isCurrent: false
};

TodoListItem.propTypes = {
    id: React.PropTypes.string.isRequired,
    externalId: React.PropTypes.number,
    title: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool.isRequired,
    onCheckedChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,
    isCurrent: React.PropTypes.bool.isRequired
};

export default TodoListItem;
