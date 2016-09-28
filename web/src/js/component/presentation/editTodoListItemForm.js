import React from 'react';
import ReactDOM from 'react-dom';

const TITLE_FIELD = 'title';
const DESCRIPTION_FIELD = 'description';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/tomorrow';

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
            [DESCRIPTION_FIELD]: this.props.description
        };
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this._focusTitleInput();
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

        this.props.onEdit(this.state[TITLE_FIELD]);
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
                            name="UNIQUE_ID_OF_DIV"
                            showGutter={ false }
                            width="100%"
                            value={ this.props.description }
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
        );
    }
}

EditTodoListItemForm.defaultProps = {
    description: ''
};

EditTodoListItemForm.propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    onEdit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
};

export default EditTodoListItemForm;
