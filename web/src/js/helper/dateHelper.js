import Moment from 'moment';
import 'moment/locale/nl';
Moment.locale('nl');

/**
 * @type {string}
 */
const DEFAULT_DATE_API_FORMAT = 'YYYY-MM-DD';

/**
 * @type {Object}
 */
const DAYS_OF_THE_WEEK = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6
};

/**
 * @param {*} value
 *
 * @throws {Error}
 *
 * @private
 */
var _validateMomentIsValid = function (value) {
    if (!isMoment(value)) {
        throw new Error('Value is not an instance of Moment');
    }

    if (!value.isValid()) {
        throw new Error('invalid date given for Momentjs');
    }
};

/**
 * @param {*} value
 *
 * @returns {boolean}
 *
 * @private
 */
export function isMoment(value) {
    return value instanceof Moment;
}

/**
 * @param {Moment} value
 */
export function isTomorrow(value) {
    _validateMomentIsValid(value);

    return createTomorrow().format(DEFAULT_DATE_API_FORMAT) === value.format(DEFAULT_DATE_API_FORMAT);
}

/**
 * @returns {Moment}
 */
export function createTomorrow() {
    var tomorrow = Moment();
    tomorrow.add(1, 'days');

    return tomorrow;
}

/**
 * @param {Moment} value
 */
export function isToday(value) {
    _validateMomentIsValid(value);

    return createToday().format(DEFAULT_DATE_API_FORMAT) === value.format(DEFAULT_DATE_API_FORMAT);
}

/**
 * @param {String} value
 *
 * @returns {boolean}
 */
export function isDayOfTheWeek(value) {
    return Object.keys(DAYS_OF_THE_WEEK).indexOf(value) !== -1;
}

/**
 * @param {String} dayOfTheWeek
 *
 * @returns {Moment|null}
 */
export function createNextDayOfTheWeek(dayOfTheWeek) {
    if (!isDayOfTheWeek(dayOfTheWeek)) {
        return null;
    }

    var currentDayOfTheWeek = parseInt(Moment().format('d')),
        nextDayOfTheWeek = DAYS_OF_THE_WEEK[dayOfTheWeek];

    if (currentDayOfTheWeek >= nextDayOfTheWeek) {
        nextDayOfTheWeek += 7;
    }

    return createToday().weekday(nextDayOfTheWeek);
}

/**
 * @returns {Moment}
 */
export function createToday() {
    return Moment();
}

/**
 * @param {String} value
 * @param {String=} format
 *
 * @returns {Moment}
 */
export function toMoment(value, format = DEFAULT_DATE_API_FORMAT) {
    var theMoment = Moment(value, format);

    _validateMomentIsValid(theMoment);

    return theMoment;
}
