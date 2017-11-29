/**
 * Created by elyde on 10/13/2016.
 * @see http://semver.org/
 */
/**
 * Created by Ely on 1/21/2015.
 */

(function () {

    'use strict';

    function throwErrorIfLessThan1 (contextName_, valueName_, value_) {
        if (value_ < 1) {
            throw new Error(contextName_ + '.' + valueName_ + ' must be a number greater than 0.');
        }
    }

    let isNodeEnv = typeof window === 'undefined',
        sjl = isNodeEnv ? require('../fjlInputFilter') : window.sjl || {},
        Validator = sjl.validator.Validator,
        contextName = 'sjl.validator.SemanticVersionValidator',
        SemanticVersionValidator = function SemanticVersionValidator (/**...options {Object}**/) {
            let _maxNumericIdLength = SemanticVersionValidator.MAX_NUMERIC_ID_LENGTH,
                _maxAlphaNumericIdLength = SemanticVersionValidator.MAX_ALPHA_NUMERIC_ID_LENGTH,
                _messageTemplates = {
                
                };
            Object.defineProperties(this, {
                maxNumericIdLength: {
                    get: function () {
                        return _maxNumericIdLength;
                    },
                    set: function (value) {
                        sjl.throwTypeErrorIfNotOfType(contextName, 'maxNumericIdLength', value, 'Number');
                        throwErrorIfLessThan1(contextName, 'maxNumericIdLength', value);
                        _maxNumericIdLength = value;
                    },
                    enumerable: true
                },
                maxAlphaNumericIdLength: {
                    get: function () {
                        return _maxAlphaNumericIdLength;
                    },
                    set: function (value) {
                        sjl.throwTypeErrorIfNotOfType(contextName, 'maxAlphaNumericIdLength', value, 'Number');
                        throwErrorIfLessThan1(contextName, 'maxAlphaNumericIdLength', value);
                        _maxAlphaNumericIdLength = value;
                    },
                    enumerable: true
                }
            });
            Validator.apply(this, [{ messageTemplates: _messageTemplates }].concat(sjl.argsToArray(arguments)));
        };

    SemanticVersionValidator = Validator.extend(SemanticVersionValidator, {

        isValid: function (value) {

        }
    });

    // @note regexs here are sudo-coded/preliminary/not-final
    Object.defineProperties(SemanticVersionValidator, {
        MAX_NUMERIC_ID_LENGTH: {
            value: 55
        },
        MAX_ALPHA_NUMERIC_ID_LENGTH: {
            value: 200
        },
        REGEX_NUMERIC_ID: {
            value: /([1-9]\d{0,55})/
        },
        REGEX_ALPHANUMERIC_ID: {
            value: /([a-zA-Z1-9][a-zA-Z\d\-]{1,255})/
        },
        REGEX_MAJORMINORPATCH: {
            value: /^(\d{1,9}\.\d{1,9}\.\d{1,9})/
        },
        REGEX_PRERELEASE: {
            value: /(-[a-zA-Z1-9][a-zA-Z\-.\d]{1,255})/
        },
        REGEX_METADATA: {
            value: /(\+[a-zA-Z\-.\d]{1,255})/
        },
        validate: {
            value: function (value) {
                // Test for empty identifiers
                if (/\.{2,}/.test(value)) {

                }

                // Test Major.Minor.Patch section
                else if (!SemanticVersionValidator.REGEX_MAJORMINORPATCH.test(value)) {

                }

                // Test Pre-release section
                else if (!SemanticVersionValidator.REGEX_PRERELEASE.test(value)) {

                }

                // Test Meta-data section
                else if (!SemanticVersionValidator.REGEX_METADATA.test(value)) {

                }
            }
        }
    });

    if (isNodeEnv) {
        module.exports = SemanticVersionValidator;
    }
    else {
        sjl.ns('validator.SemanticVersionValidator', SemanticVersionValidator);
        if (window.__isAmd) {
            return SemanticVersionValidator;
        }
    }

})();
