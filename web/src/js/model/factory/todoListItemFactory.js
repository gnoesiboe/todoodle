import TodoListItemCollection from './../../collection/todoListItemCollection';
import { validatePropertyPathExists } from './../../helper/objectHelper';
import uuid from 'uuid';
import TodoListItem from './../todoListItem';
import _ from 'lodash';
import { toMoment, isMoment } from './../../helper/dateHelper';
import { parseDeadline } from './../../parser/deadlineParser';

const QUICK_ADD_DEADLINE_PATTERN = /:([^ ]+)/;

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
 * @param {String} id
 * @param {String} title
 *
 * @returns {TodoListItem}
 */
export function createModelFromQuickAdd(id, title) {
    var deadlineMatches = title.match(QUICK_ADD_DEADLINE_PATTERN);

    if (_.isArray(deadlineMatches) && typeof deadlineMatches[1] !== 'undefined') {
        var deadline = parseDeadline(deadlineMatches[1]);

        if (isMoment(deadline)) {
            title = title.replace(QUICK_ADD_DEADLINE_PATTERN, '');
        } else {
            deadline = null;
        }
    }

    return createModel(id, title, null, false, null, deadline);
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
