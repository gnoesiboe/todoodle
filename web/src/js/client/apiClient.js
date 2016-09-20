import 'whatwg-fetch'; // Polyfill fetch

var Routing = Routing || {};

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
 * @param {Object} configuration
 *
 * @returns {Promise}
 *
 * @private
 */
var _executeGet = function (url, configuration = {}) {
    return fetch (url, configuration)
        .then((response) => {
            _validateResponseStatusCode(response);

            return response;
        })
        .then(_parseResponse);
};

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
