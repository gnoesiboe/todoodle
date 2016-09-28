import React from 'react';
import ReactDOM from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/tomorrow';
import * as keyboardListener from './../../listener/keyboardListener';

const TITLE_FIELD = 'title';
const DESCRIPTION_FIELD = 'description';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class EditTodoListItemForm extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            [TITLE_FIELD]: this.props.title,
            [DESCRIPTION_FIELD]: this.props.description ? this.props.description : ''
        };

        this._keyboardBindingIds = [];
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this._focusTitleInput();
        this._bindKeyboardShortcuts();
    }

    /**
     * @private
     */
    _bindKeyboardShortcuts() {
        this._keyboardBindingIds.push(
            keyboardListener.bind(['command+enter', 'ctrl+enter'], this._onSubmitKeyboardBindingPressed.bind(this), true),
            keyboardListener.bind('esc', this._onCancelKeyboardBindingPressed.bind(this), true)
        );
    }

    /**
     * @private
     */
    _onCancelKeyboardBindingPressed() {
        this.props.onCancel();
    }

    /**
     * @private
     */
    _onSubmitKeyboardBindingPressed() {
        this._submit();
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        keyboardListener.unbindBatch(this._keyboardBindingIds);
    }

    /**
     * @private
     */
    _focusTitleInput() {
        ReactDOM.findDOMNode(this.refs[TITLE_FIELD]).focus();
    }

    /**
     * @param {Event} event
     *
     * @private
     */
    _onSubmit(event) {

        // prevent submit to backend
        event.preventDefault();

        this._submit();
    }

    /**
     * @private
     */
    _submit() {
        this.props.onEdit(
            this.state[TITLE_FIELD],
            this.state[DESCRIPTION_FIELD]
        );
    }

    /**
     * @param {String} fieldName
     * @param {Event} event
     *
     * @private
     */
    _onFieldChange(fieldName, event) {
        var field = event.target;

        this.setState({
            [fieldName]: field.value
        });
    }

    /**
     * @param {String} fieldName
     * @param {String} newValue
     *
     * @private
     */
    _onAceEditorChange(fieldName, newValue) {
        this.setState({
            [fieldName]: newValue
        })
    }

    /**
     * @param {Event} event
     * @private
     */
    _onCancel(event) {

        // prevent browser from following link
        event.preventDefault();

        this.props.onCancel();
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="edit-todo-list-item-form">
                <form className="form" onSubmit={ this._onSubmit.bind(this) }>
                    <div className="form-group">
                        <label
                            className="control-label"
                            htmlFor={ TITLE_FIELD + '_field_id' }
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            value={ this.state[TITLE_FIELD] }
                            ref={ TITLE_FIELD }
                            id={ TITLE_FIELD + '_field_id' }
                            onChange={ this._onFieldChange.bind(this, TITLE_FIELD) }
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label
                            className="control-label"
                            htmlFor={ DESCRIPTION_FIELD + '_field_id' }
                        >
                            Description
                        </label>
                        <div className="edit-todo-list-item-form-description">
                            <AceEditor
                                mode="markdown"
                                theme="tomorrow"
                                name={ `ace_editor_for_item_${this.props.id}` }
                                showGutter={ false }
                                width="100%"
                                value={ this.state[DESCRIPTION_FIELD] }
                                onChange={ this._onAceEditorChange.bind(this, DESCRIPTION_FIELD) }
                                editorProps={{ $blockScrolling: true }}
                                maxLines={ Infinity }
                                wrapEnabled={ true }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <ul className="list-inline">
                            <li>
                                <button type="submit" className="btn btn-success">Save</button>
                            </li>
                            <li>
                                <a href="#" onClick={ this._onCancel.bind(this)} className="btn btn-link">Cancel</a>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        );
    }
}

EditTodoListItemForm.defaultProps = {
    description: ''
};

EditTodoListItemForm.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    onEdit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
};

export default EditTodoListItemForm;
