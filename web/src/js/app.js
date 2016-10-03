import React from 'react';
import ReactDom from 'react-dom';
import Application from './component/container/application';
import { Provider } from 'react-redux';
import store from './store';
import * as es6Promise from 'es6-promise';
import './../scss/component/container.scss';
import 'react-toolbox/lib/commons.scss';

var containerDomElements = document.getElementsByClassName('js-app-container');

es6Promise.polyfill(); // Cross-browser support for Promises

if (containerDomElements.length > 0) {
    var containerDomEl = containerDomElements[0],
        todoListId = containerDomEl.getAttribute('data-id'),
        todoListToken = containerDomEl.getAttribute('data-token');

    if (!todoListId) {
        throw new Error('A todo list id should be available');
    }

    if (!todoListToken) {
        throw new Error('A todo list token should be available');
    }

    ReactDom.render(
        <Provider store={ store }>
            <Application
                todoListExternalId={ parseInt(todoListId) }
                todoListToken={ todoListToken }
            />
        </Provider>,
        containerDomEl
    );
}
