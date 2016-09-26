import 'whatwg-fetch'; // Polyfill fetch
import * as queryString from 'query-string';

/**
 * @param {Object} response
 *
 * @private
 */
var _validateResponseStatusCode = function (response) {
    if (response.status >= 200 && response.status < 300) {

        // request was succesfuly handled
        return;
    }

    var error = new Error();
    error.response = response.json();

    throw error;
};

/**
 * @param {Object} response
 *
 * @returns {Object}
 *
 * @private
 */
var _parseResponse = function (response) {
    return response.json();
};

/**
 * @param {String} url
 * @param {Object=} configuration
 *
 * @returns {Promise}
 *
 * @private
 */
var _execute = function (url, configuration = {}) {
    return fetch (url, configuration)
        .then((response) => {
            _validateResponseStatusCode(response);

            return response;
        })
        .then(_parseResponse)
};

/**
 * @param {String} url
 *
 * @returns {Promise}
 *
 * @private
 */
var _executeGet = function (url) {
    return _execute(url);
};

/**
 * @param {String} url
 * @param {Object} body
 * 
 * @returns {Promise}
 *
 * @private
 */
var _executePut = function (url, body = {}) {

    // use www-form-urlencoded as otherwise multipart is used, which does not work with PUT request
    var theHeaders = new Headers();
    theHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

    var bodyQueryString = Object.keys(body).length > 0
        ? queryString.stringify(body)
        : '';

    return _execute(url + '?' + queryString, {
        method: 'put',
        body: bodyQueryString,
        headers: theHeaders
    });
};

/**
 * @param {String} url
 *
 * @returns {Promise}
 *
 * @private
 */
var _executeDelete = function (url) {
    return _execute(url, {
        method: 'delete'
    });
};

/**
 * @param {String} url
 * @param {Object} body
 *
 * @returns {Promise}
 *
 * @private
 */
var _executePost = function (url, body) {
    var formData = new FormData();

    for (let key in body) {
        if (body.hasOwnProperty(key)) {
            formData.append(key, body[key]);
        }
    }

    return _execute(url, {
        method: 'post',
        body: formData
    });
};

/**
 * @param {Number} todoListId
 * @param {String} todoListToken
 * @param {Number} id
 *
 * @returns {Promise}
 */
export function checkTodoListItem(todoListId, todoListToken, id) {
    return new Promise(
        function (resolve, reject) {
            var url = window.Routing.generate('api_todo_list_item_check', {
                todoListId: todoListId,
                todoListToken: todoListToken,
                id: id
            });

            _executePut(url)
                .then((json) => resolve(json))
                .catch((error) => reject(error));
        }
    )
}

/**
 * @param {Number} todoListId
 * @param {String} todoListToken
 * @param {Number} id
 *
 * @returns {Promise}
 */
export function uncheckTodoListItem(todoListId, todoListToken, id) {
    return new Promise(
        function (resolve, reject) {
            var url = window.Routing.generate('api_todo_list_item_uncheck', {
                todoListId: todoListId,
                todoListToken: todoListToken,
                id: id
            });

            _executePut(url)
                .then((json) => resolve(json))
                .catch((error) => reject(error));
        }
    )
}

/**
 * @param {Number} todoListId
 * @param {String} todoListToken
 * @param {String} title
 * @param {String} id
 *
 * @returns {Promise}
 */
export function createTodoListItem(todoListId, todoListToken, title, id) {
    return new Promise(
        function (resolve, reject) {
            var url = window.Routing.generate('api_todo_list_item_create', {
                todoListId: todoListId,
                todoListToken: todoListToken
            });

            // pass our client-side id to the server to receive it back as external reference
            // we do this so we can match the incoming TodoListItem with the one we already have
            // in memory, to be able to merge the results.
            url += `?external_reference=${id}`;

            var body = {
                title: title
            };

            _executePost(url, body)
                .then((json) => resolve(json))
                .catch((error) => reject(error));
        }
    )
}

/**
 * @param {Number} todoListId
 * @param {String} todoListToken
 * @param {Number} id
 * @param {String} title
 * 
 * @returns {Promise}
 */
export function editTodoListItem(todoListId, todoListToken, id, title) {
    return new Promise(
        function (resolve, reject) {
            var url = window.Routing.generate('api_todo_list_item_edit', {
                todoListId: todoListId,
                todoListToken: todoListToken,
                id: id
            });

            var body = {
                title: title
            };

            _executePut(url, body)
                .then((json) => resolve(json))
                .catch((error) => reject(error));
        }
    )
}

/**
 * @param {Number} todoListId
 * @param {String} todoListToken
 * @param {Number} id
 *
 * @returns {Promise}
 */
export function removeTodoListItem(todoListId, todoListToken, id) {
    return new Promise(
        function (resolve, reject) {
            var url = window.Routing.generate('api_todo_list_item_remove', {
                todoListId: todoListId,
                todoListToken: todoListToken,
                id: id
            });

            _executeDelete(url)
                .then((json) => resolve(json))
                .catch((error) => reject(error));
        }
    )
}

/**
 * @param {Number} id
 * @param {String} token
 * @returns {Promise}
 */
export function getTodoList(id, token) {
    return new Promise(
        function (resolve, reject) {
            var url = window.Routing.generate('api_todo_list_detail', { id, token });

            _executeGet(url)
                .then((json) => resolve(json))
                .catch((error) => reject(error));
        }
    );
}
