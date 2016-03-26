/**
 * Created by Ely on 1/21/2015.
 */

(function () {

    'use strict';

    var isNodeEnv = typeof window === 'undefined',
        sjl = isNodeEnv ? require('sjljs') : window.sjl || {},
        RegexValidator = sjl.ns.validator.RegexValidator,
        contextName = 'sjl.ns.validator.Digits',
        Digits = function Digits (/**...options {Object}**/) {
            RegexValidator.apply(this, [{
                pattern: /^\d+$/,
                messageTemplates: {
                    DOES_NOT_MATCH_PATTERN: function () {
                        return 'The value passed in contains non digital characters.  ' +
                            'Value received: "' + this.value + '".';
                    }
                }
            }].concat(sjl.argsToArray(arguments)));
        };

    Digits = RegexValidator.extend(Digits);

    if (isNodeEnv) {
        module.exports = Digits;
    }
    else {
        sjl.ns('validator.Digits', Digits);
        if (window.__isAmd) {
            return Digits;
        }
    }

})();
