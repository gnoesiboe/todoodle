import React from 'react';
import classNames from 'classnames';
import * as dateHelper from './../../helper/dateHelper';
import Moment from 'moment';

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

        this.props.onRemove(this.props.id, this.props.externalId);
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

        this.props.onEditStart(this.props.id);
    }

    /**
     * @private
     */
    _onClick() {
        this.props.onClick(this.props.id);
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
     * @returns {XML|null}
     *
     * @todo move to seperate component for re-use and to spread responsiblities
     *
     * @private
     */
    _renderDeadline() {
        var deadline = this.props.deadline;

        if (!dateHelper.isMoment(deadline)) {
            return (
                <span className="todo-list-item-deadline--muted">
                    -
                </span>
            );
        }

        if (dateHelper.isToday(deadline)) {
            return (
                <span className="todo-list-item-deadline--urgent">
                    today
                </span>
            );
        }

        if (dateHelper.isTomorrow(deadline)) {
            return (
                <span className="todo-list-item-deadline">
                    tomorrow
                </span>
            );
        }

        return (
            <span className="todo-list-item-deadline">
                { deadline.format('D MMM') }
            </span>
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        var { id, checked, title, deadline } = this.props,
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
                    { this._renderDeadline() }
                </td>
                <td className="todo-list-item-actions">
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
}

TodoListItem.defaultProps = {
    isChecked: false,
    externalId: null,
    isCurrent: false,
    deadline: null
};

TodoListItem.propTypes = {
    id: React.PropTypes.string.isRequired,
    externalId: React.PropTypes.number,
    title: React.PropTypes.string.isRequired,
    deadline: React.PropTypes.instanceOf(Moment),
    checked: React.PropTypes.bool.isRequired,
    onCheckedChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onEditStart: React.PropTypes.func.isRequired,
    onEditCancel: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,
    isCurrent: React.PropTypes.bool.isRequired
};

export default TodoListItem;
