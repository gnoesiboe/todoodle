import React from 'react';

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
            <form action="" method="get" className="form" onSubmit={ this._onSubmit.bind(this) }>
                <div className="form-group">
                    <label htmlFor="add-todo-list-item-form-title" />
                    <input
                        type="text"
                        id="add-todo-list-item-form-title"
                        ref={ TITLE_FIELD }
                        value={ this.state.title }
                        onChange={ this._onFieldChange.bind(this, TITLE_FIELD) }
                    />
                </div>
            </form>
        );
    }
}

AddTodoListItemForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};

export default AddTodoListItemForm;
