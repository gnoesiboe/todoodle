import Moment from 'moment';
import 'moment/locale/nl';

const DEFAULT_DATE_API_FORMAT = 'YYYY-MM-DD';

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

    var tomorrow = Moment();
    tomorrow.add(1, 'days');

    return tomorrow.format(DEFAULT_DATE_API_FORMAT) === value.format(DEFAULT_DATE_API_FORMAT);
}

/**
 * @param {Moment} value
 */
export function isToday(value) {
    _validateMomentIsValid(value);

    var today = Moment();

    return today.format(DEFAULT_DATE_API_FORMAT) === value.format(DEFAULT_DATE_API_FORMAT);
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
