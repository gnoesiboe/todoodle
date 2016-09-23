import TodoListItemCollection from './../../collection/todoListItemCollection';
import { validatePropertyPathExists } from './../../helper/objectHelper';
import uuid from 'uuid';
import TodoListItem from './../todoListItem';

/**
 * @param {String} id
 * @param {String} title
 * @param {Number=} externalId
 * @param {Boolean=} checked
 *
 * @returns {TodoListItem}
 */
export function createModel(id, title, externalId = null, checked = false) {
    return new TodoListItem(
        id,
        title,
        externalId,
        checked
    );
}

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

    return createModel(
        uuid(),
        apiInput.title,
        apiInput.id,
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
