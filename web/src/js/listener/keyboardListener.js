import mousetrap from 'mousetrap';
import uuid from 'uuid';

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
     */
    constructor(key, callback) {
        this.key = key;
        this.callback = callback;
    }

    bind() {
        mousetrap.bind(this.key, this.callback);
    }

    unbind() {
        mousetrap.unbind(this.key, this.callback);
    }
}

/**
 * @param {String} key
 * @param {Function} callback
 */
export function bind(key, callback) {
    var id = uuid();

    var binding = new KeyboardBinding(key, callback);
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
