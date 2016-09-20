import React from 'react';
import * as reactRedux from 'react-redux';
import * as stateNamespace from './../../model/stateNamespace';
import { createImportTodoListAction } from './../../model/factory/actionFactory';
import _ from 'lodash';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class Application extends React.Component {

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this.props.dispatch(
            createImportTodoListAction(this.props.todoListExternalId, this.props.todoListToken)
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        var todoList = this.props.current.get('todoList');

        return (
            <div>
                { _.isObject(todoList) ? todoList.id : 'Loading..' }
            </div>
        );
    }
}

Application.propTypes = {
    current: React.PropTypes.object.isRequired,
    todoListExternalId: React.PropTypes.number.isRequired,
    todoListToken: React.PropTypes.string.isRequired
};

/**
 * Takes the whole store state and maps it to the application component properties to supply
 * it with the information it needs, and to detach the component from the store.
 *
 * @param {Object} completeState
 *
 * @returns {Object}
 */
var mapCompleteStateToApplicationProps = function (completeState) {
    return {
        current: completeState[stateNamespace.CURRENT]
    }
};

export default reactRedux.connect(mapCompleteStateToApplicationProps)(Application);