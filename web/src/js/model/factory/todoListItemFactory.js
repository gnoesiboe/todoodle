import TodoListItemCollection from './../../collection/todoListItemCollection';
import { validatePropertyPathExists } from './../../helper/objectHelper';
import uuid from 'uuid';
import TodoListItem from './../todoListItem';
import _ from 'lodash';
import { toMoment } from './../../helper/dateHelper';

/**
 * @param {String} id
 * @param {String} title
 * @param {Number=} externalId
 * @param {Boolean=} checked
 * @param {String=} description
 * @param {String|Moment=} deadline
 *
 * @returns {TodoListItem}
 */
export function createModel(id, title, externalId = null, checked = false, description = null, deadline = null) {
    return new TodoListItem(
        id,
        title,
        externalId,
        checked,
        description,
        _.isString(deadline) ? toMoment(deadline) : deadline
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
    validatePropertyPathExists(apiInput, 'description', unexpectedResponseMessage);
    validatePropertyPathExists(apiInput, 'deadline', unexpectedResponseMessage);

    return createModel(
        uuid(),
        apiInput.title,
        apiInput.id,
        apiInput.checked,
        apiInput.description,
        apiInput.deadline
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
