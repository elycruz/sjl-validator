/**
 * Created by elydelacruz on 3/25/16.
 */
(function () {

    'use strict';

    var isNodeJs = typeof window === 'undefined',
        sjl = isNodeJs ? require('sjljs') : window.sjl,
        ns = require('../namespace'),
        StripTags = ns.filter.Filter.extend({
            constructor: function StripTags(value) {
                if (!sjl.isset(this)) {
                    return StripTags.filter(value);
                }
            },
            stripHtmlComments: function (value) {
                var strippedValue = value + '',
                    commentStart = '<!--',
                    commentEnd = '-->',
                    commentStartPos = strippedValue.indexOf(commentStart);
                while (commentStartPos > -1) {
                    var strHead = strippedValue.substring(0, commentStartPos),
                        nextCommentStart = strippedValue.indexOf(commentStart, commentStartPos + commentStart.length),
                        nextCommentEnd = strippedValue.indexOf(commentEnd, commentStartPos + commentStart.length);
                    strippedValue = strHead;
                    if (nextCommentStart > nextCommentEnd) {
                        //strippedValue +=

                    }
                }
            },
            filter: function (value) {
                return StripTags.filter(value);
            }
        });

    Object.defineProperties(StripTags, {
        filter: {
            value: function (value) {
                sjl.throwTypeErrorIfNotOfType('sjl.filter.StripTags', 'value', value, String);
                return value.toLowerCase();
            },
            enumerable: true
        }
    });

    if (!isNodeJs) {
        sjl.ns('filter.StripTags', StripTags);
        return StripTags;
    }
    else {
        module.exports = StripTags;
    }

}());
