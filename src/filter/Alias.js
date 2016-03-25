/**
 * Created by elydelacruz on 3/25/16.
 */
(function () {

    'use strict';

    var isNodeJs = typeof window === 'undefined',
        sjl = isNodeJs ? require('sjljs') : window.sjl,
        Slug = require('../namespace').filter.Slug,
        Alias = Slug.extend(function Alias(value) {
            if (!sjl.isset(this)) {
                return Alias.filter(value);
            }
        });

    if (!isNodeJs) {
        sjl.ns('filter.Alias', Alias);
        return Alias;
    }
    else {
        module.exports = Alias;
    }

}());