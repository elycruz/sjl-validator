/**
 * Created by elydelacruz on 3/25/16.
 */
(function () {

    'use strict';

    var isNodeJs = typeof window === 'undefined',
        sjl = isNodeJs ? require('sjljs') : window.sjl,
        ns = require('../namespace'),
        Slug = ns.filter.Filter.extend({
            constructor: function Slug(value) {
                if (!sjl.isset(this)) {
                    return Slug.filter(value);
                }
            },
            filter: function (value) {
                return Slug.filter(value);
            }
        });

    Object.defineProperties(Slug, {
        allowedCharsRegex: {
            value: /[^a-z\d\-\_]/gim,
            enumerable: true
        },
        filter: {
            value: function (value, max) {
                sjl.throwTypeErrorIfNotOfType('sjl.filter.Slug', 'value', value, String);
                max = sjl.classOfIs(max, Number) ? max : 201;
                return value.trim().toLowerCase()
                    .split(Slug.allowedCharsRegex)
                    .filter(function (char) {
                        return char.length > 0;
                    })
                    .join('-')
                    .substring(0, max);
            },
            enumerable: true
        }
    });

    if (!isNodeJs) {
        sjl.ns('filter.Slug', Slug);
        return Slug;
    }
    else {
        module.exports = Slug;
    }

}());