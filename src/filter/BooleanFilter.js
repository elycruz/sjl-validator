/**
 * Created by elydelacruz on 3/25/16.
 */
(function () {

    'use strict';

    var isNodeJs = typeof window === 'undefined',
        sjl = isNodeJs ? require('sjljs') : window.sjl,
        ns = require('../namespace'),
        Filter = ns.filter.Filter,

        BooleanFilter = Filter.extend({
            constructor: function BooleanFilter(valueOrOptions) {
                if (!sjl.isset(this)) {
                    return BooleanFilter.filter(valueOrOptions);
                }
                var _allowCasting = true,
                    _translationsToUse = {}, // Object<String, Boolean>
                    _conversionRules = []; // Array<String>
                Object.defineProperties(this, {
                    allowCasting: {
                        get: function () {
                            return _allowCasting;
                        },
                        set: function (value) {
                            sjl.throwTypeErrorIfNotOfType(contextName, 'allowCasting', value, Boolean);
                            _allowCasting = value;
                        }
                    },
                    translationsToUse: {
                        get: function () {
                            return _translationsToUse;
                        },
                        set: function (value) {
                            sjl.throwTypeErrorIfNotOfType(contextName, 'translationsToUse', value, Object);
                            _translationsToUse = value;
                        }
                    },
                    conversionRules: {
                        get: function () {
                            return _conversionRules;
                        },
                        set: function (value) {
                            sjl.throwTypeErrorIfNotOfType(contextName, 'conversionRules', value, Array);
                            _conversionRules = value;
                        }
                    }
                });
                Filter.apply(this, arguments);
            },
            filter: function (value) {
                return BooleanFilter.filter(value);
            }
        });

    Object.defineProperties(BooleanFilter, {
        filter: {
            value: function (value) {
                sjl.throwTypeErrorIfNotOfType('sjl.filter.BooleanFilter', 'value', value, String);
                return value.toLowerCase();
            },
            enumerable: true
        }
    });

    if (!isNodeJs) {
        sjl.ns('filter.BooleanFilter', BooleanFilter);
        return BooleanFilter;
    }
    else {
        module.exports = BooleanFilter;
    }

}());
