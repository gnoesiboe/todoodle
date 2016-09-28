import mousetrap from 'mousetrap';
import uuid from 'uuid';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind.min';

/**
 * @type {Object}
 *
 * @private
 */
var _callbacks = {};

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class KeyboardBinding {

    /**
     * @param {String} key
     * @param {Function} callback
     * @param {Boolean=} global
     */
    constructor(key, callback, global = false) {
        this._key = key;
        this._callback = callback;
        this._global = global;
    }

    bind() {
        if (this._global) {
            mousetrap.bindGlobal(this._key, this._callback);
        } else {
            mousetrap.bind(this._key, this._callback);
        }
    }

    unbind() {
        if (this._global) {
            // @see https://github.com/ccampbell/mousetrap/issues/306
            mousetrap.bindGlobal(this._key, function () { });
        } else {
            mousetrap.unbind(this._key, this._callback);
        }
    }
}

/**
 * @param {String|String[]} key
 * @param {Function} callback
 * @param {Boolean} global
 */
export function bind(key, callback, global = false) {
    var id = uuid();

    var binding = new KeyboardBinding(key, callback, global);
    binding.bind();

    _callbacks[id] = binding;

    return id;
}

/**
 * @param {String} id
 *
 * @return {Boolean}
 */
export function unbind(id) {
    var binding = typeof _callbacks[id] !== 'undefined' ? _callbacks[id] : null;

    if (!(binding instanceof KeyboardBinding)) {
        return false;
    }

    binding.unbind();

    delete _callbacks[id];

    return true;
}

/**
 * @param {String[]} ids
 */
export function unbindBatch(ids) {
    for (let i = 0, l = ids.length; i < l; i++) {
        unbind(ids[i]);
    }
}
