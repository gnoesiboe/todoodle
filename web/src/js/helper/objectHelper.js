import objectPath from 'object-path';

/**
 * @param {Object} object
 * @param {String} path
 * @param {String} errorMessage
 *
 * @throws {Error}
 */
export function validatePropertyPathExists(object, path, errorMessage = '') {
    if (!checkPropertyPathExists(object, path)) {
        throw new Error(errorMessage);
    }
}

/**
 * @param {Object} object
 * @param {String} path
 *
 * @returns {Boolean}
 */
export function checkPropertyPathExists(object, path) {
    return objectPath.has(object, path);
}
