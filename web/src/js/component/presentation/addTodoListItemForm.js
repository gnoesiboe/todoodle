import React from 'react';
import ReactDOM from 'react-dom';
import * as keyboardListener from './../../listener/keyboardListener';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

const TITLE_FIELD = 'title';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class AddTodoListItemForm extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = this._getResetState();

        this._keyboardBindingIds = [];
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this._bindKeyboardShortcuts();
    }

    /**
     * @private
     */
    _bindKeyboardShortcuts() {
        this._keyboardBindingIds.push(
            keyboardListener.bind('a', this._onFocusKeyboardBindingPressed.bind(this)),
            keyboardListener.bind('esc', this._onBlurKeyboardBindingPressed.bind(this), true)
        );
    }

    /**
     * @private
     */
    _onBlurKeyboardBindingPressed() {
        this._blurTitleField();
    }

    /**
     * @private
     */
    _blurTitleField() {
        ReactDOM.findDOMNode(this.refs[TITLE_FIELD]).blur();
    }

    /**
     * @param {Event} event
     *
     * @private
     */
    _onFocusKeyboardBindingPressed(event) {

        // prevent letter 'a' from being typed in add todo list item form
        event.preventDefault();

        this._focusTitleField();
    }

    /**
     * @private
     */
    _focusTitleField() {
        ReactDOM.findDOMNode(this.refs[TITLE_FIELD]).focus();
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        keyboardListener.unbindBatch(this._keyboardBindingIds);
    }

    /**
     * @returns {Object}
     *
     * @private
     */
    _getResetState() {
        return {
            [TITLE_FIELD]: ''
        }
    }

    /**
     * @param {String} fieldName
     * @param {String} value
     *
     * @private
     */
    _onFieldChange(fieldName, value) {
        this.setState({
            [fieldName]: value
        });
    }

    /**
     * @param {Event} event
     *
     * @private
     */
    _onSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state[TITLE_FIELD]);

        this.setState(this._getResetState());
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="add-todo-list-item-form">
                <form action="" method="get" className="form" onSubmit={ this._onSubmit.bind(this) }>
                    <div className="form-group">
                        <Input
                            type="text"
                            label="Title"
                            name="title"
                            ref={ TITLE_FIELD }
                            value={ this.state.title }
                            onChange={ this._onFieldChange.bind(this, TITLE_FIELD) }
                        />
                    </div>
                </form>
            </div>
        );
    }
}

AddTodoListItemForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};

export default AddTodoListItemForm;
