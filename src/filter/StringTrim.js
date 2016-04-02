/**
 * Created by elydelacruz on 3/25/16.
 */
(function () {

    'use strict';

    var isNodeJs = typeof window === 'undefined',
        sjl = isNodeJs ? require('sjljs') : window.sjl,
        ns = require('../namespace'),
        StringTrim = ns.filter.Filter.extend({
            constructor: function StringTrim(value) {
                if (!sjl.isset(this)) {
                    return StringTrim.filter(value);
                }
            },
            filter: function (value) {
                return StringTrim.filter(value);
            }
        });

    Object.defineProperties(StringTrim, {
        filter: {
            value: function (value) {
                sjl.throwTypeErrorIfNotOfType('sjl.filter.StringTrim', 'value', value, String);
                return value.trim();
            },
            enumerable: true
        }
    });

    if (!isNodeJs) {
        sjl.ns('filter.StringTrim', StringTrim);
        return StringTrim;
    }
    else {
        module.exports = StringTrim;
    }

}());
