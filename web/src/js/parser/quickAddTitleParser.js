import * as dateHelper from './../helper/dateHelper';
import _ from 'lodash';

const QUICK_ADD_DEADLINE_PATTERN = /:([^ ]+)/;

/**
 * @param {String} value
 *
 * @returns {Moment|null}
 *
 * @private
 */
var _parseDeadline = function (value) {
    if (value === 'today') {
        return dateHelper.createToday();
    }

    if (value === 'tomorrow') {
        return dateHelper.createTomorrow();
    }

    if (dateHelper.isDayOfTheWeek(value)) {
        return dateHelper.createNextDayOfTheWeek(value);
    }

    try {
        return dateHelper.toMoment(value);
    } catch (error) {
        return null;
    }
};

/**
 * @param {String} title
 *
 * @returns {Object}
 */
export function parseQuickAddTitle(title) {
    var deadlineMatches = title.match(QUICK_ADD_DEADLINE_PATTERN);

    var out = {
        title: title,
        deadline: null
    };

    if (_.isArray(deadlineMatches) && typeof deadlineMatches[1] !== 'undefined') {
        var deadline = _parseDeadline(deadlineMatches[1]);

        if (dateHelper.isMoment(deadline)) {
            out.title = title.replace(QUICK_ADD_DEADLINE_PATTERN, '');
            out.deadline = deadline;
        }
    }

    return out;
}
