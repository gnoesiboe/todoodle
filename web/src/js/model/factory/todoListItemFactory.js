import TodoListItemCollection from './../../collection/todoListItemCollection';
import { validatePropertyPathExists } from './../../helper/objectHelper';
import uuid from 'uuid';
import TodoListItem from './../todoListItem';

/**
 * @param {Number} externalId
 * @param {String} title
 * @param {Boolean=} checked
 *
 * @returns {TodoListItem}
 *
 * @private
 */
var _createModel = function (externalId, title, checked = false) {
    return new TodoListItem(
        uuid(),
        externalId,
        title,
        checked
    );
};

/**
 * @param {Object} apiInput
 *
 * @returns {TodoListItem}
 */
export function createFromApiInput(apiInput) {
    var unexpectedResponseMessage = 'Unexpected api response format';

    validatePropertyPathExists(apiInput, 'id', unexpectedResponseMessage);
    validatePropertyPathExists(apiInput, 'title', unexpectedResponseMessage);
    validatePropertyPathExists(apiInput, 'checked', unexpectedResponseMessage);

    return _createModel(
        apiInput.id,
        apiInput.title,
        apiInput.checked
    );
}

/**
 * @param {Object} apiInput
 *
 * @returns {TodoListItemCollection}
 */
export function createCollectionFromApiInput(apiInput) {
    return new TodoListItemCollection(
        apiInput.map(
            (apiItemInput) => createFromApiInput(apiItemInput)
        )
    );
}
