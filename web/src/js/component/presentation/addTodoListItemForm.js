import React from 'react';
import ReactDOM from 'react-dom';

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
                        <label htmlFor="add-todo-list-item-form-title" />
                        <input
                            type="text"
                            id="add-todo-list-item-form-title"
                            className="form-control"
                            placeholder="Type the title of your todo and press enter"
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
