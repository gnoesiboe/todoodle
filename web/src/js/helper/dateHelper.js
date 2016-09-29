import Moment from 'moment';
import 'moment/locale/nl';

/**
 * @param {*} value
 *
 * @throws {Error}
 *
 * @private
 */
var _validateMomentIsValid = function (value) {
    if (!_isMoment(value)) {
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
var _isMoment = function (value) {
    return value instanceof Moment;
};

/**
 * @param {String} value
 *
 * @returns {Moment}
 */
export function toMoment(value) {
    var theMoment = Moment(value);

    _validateMomentIsValid(theMoment);

    return theMoment;
}
