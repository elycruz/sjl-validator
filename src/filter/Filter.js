/**
 * @constructor Filter
 * @extends sjl.ns.stdlib.Optionable
 * @memberof module:sjl.ns.filter
 * @requires sjl
 * @requires sjl.ns.stdlib.Optionable
 * @requires sjl.ns.stdlib.Extendable
 */
(function () {

    'use strict';

    var isNodeEnv = typeof window === 'undefined',
        sjl = isNodeEnv ? require('../sjl.js') : window.sjl,
        Optionable = sjl.ns.stdlib.Optionable,

    Filter = Optionable.extend({
        constructor: function Filter () {
            Optionable.apply(this, arguments);
        },
        filter: function (value) {
            return value; // filtered
        }
    });

    sjl.ns('filter.Filter', Filter);

    if (window.__isAmd) {
        return Filter;
    }

}());
