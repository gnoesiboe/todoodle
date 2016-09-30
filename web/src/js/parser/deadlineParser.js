import * as dateHelper from './../helper/dateHelper';

/**
 * @param {String} value
 *
 * @returns {Moment|null}
 */
export function parseDeadline(value) {
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
}
