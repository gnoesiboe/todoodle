import React from 'react';
import ReactDOM from 'react-dom';

const TITLE_FIELD = 'title';

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
            [TITLE_FIELD]: this.props.title
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
            <form className="form-horizontal" onSubmit={ this._onSubmit.bind(this) }>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Title</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            value={ this.state[TITLE_FIELD] }
                            ref={ TITLE_FIELD }
                            onChange={ this._onFieldChange.bind(this, TITLE_FIELD) }
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <ul className="list-inline">
                            <li>
                                <button type="submit" className="btn btn-success">Save</button>
                            </li>
                            <li>
                                <a href="#" onClick={ this._onCancel.bind(this)} className="btn btn-link">Cancel</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        );
    }
}

EditTodoListItemForm.propTypes = {
    title: React.PropTypes.string.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
};

export default EditTodoListItemForm;
