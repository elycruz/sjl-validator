/**
 * Created by elydelacruz on 3/25/16.
 */
(function () {

    'use strict';

    var isNodeJs = typeof window === 'undefined',
        sjl = isNodeJs ? require('sjljs') : window.sjl,
        ns = require('../namespace'),
        StringToLower = ns.filter.Filter.extend({
            constructor: function StringToLower(value) {
                if (!sjl.isset(this)) {
                    return StringToLower.filter(value);
                }
            },
            filter: function (value) {
                return StringToLower.filter(value);
            }
        });

    Object.defineProperties(StringToLower, {
        filter: {
            value: function (value) {
                sjl.throwTypeErrorIfNotOfType('sjl.filter.StringToLower', 'value', value, String);
                return value.toLowerCase();
            },
            enumerable: true
        }
    });

    if (!isNodeJs) {
        sjl.ns('filter.StringToLower', StringToLower);
        return StringToLower;
    }
    else {
        module.exports = StringToLower;
    }

}());
