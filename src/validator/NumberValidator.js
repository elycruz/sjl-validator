/**
 * Created by Ely on 1/21/2015.
 * Initial idea copied from the Zend Framework 2's Between Validator
 * @todo add `allowSigned` check(s).
 */

import {typeOf, unfoldr} from 'fjl';
import {getErrorMsgByKey, ValildationResult} from "./Validator";
import Validator from "./Validator";

// @todo change `getErrorMsgByKey` api;  Should be `getErrorMsgByKey(options, key, value)`;
export const

    validate = (value, options) => {
        let result = false,
            messages = [],
            classOfValue = typeOf(value),
            subResult;

        if (classOfValue === 'Number') {
            result = true;
        }
        else if (!value) {
            messages.push(getErrorMsgByKey('NOT_A_NUMBER', value, options));
        }
        else if (classOfValue === 'String') {
            // Lower case any alpha chars
            // and see if our value validates with one of the defined sub validators
            result = parseValidationFuncs([
                validateComma, validateBinary, validateHex,
                validateOctal, validateScientific, validateSigned,
                validateFloat, validateRange
            ], value.toLowerCase(), options);

            // If string didn't validate add error message
            if (!result) {
                messages.push(getErrorMsgByKey('NOT_A_NUMBER', value, options));
            }
        }
        return new ValidationResult({result, messages, value});
    },

    parseValidationFuncs = (functions, value, options) =>
        unfoldr(([_result, len], ind) => {
            if (len === 0 || _result !== 0) {
                return undefined;
            }
            const result = functions[ind](value, options);
            return [result, (result === -1 || result === 1) ? 0 : --len];
        }, [0, functions, functions.length]),

    validateHex = (value, options, messages = []) => {
        let retVal = 0,
            isHexString = value && (
                (value[1] && value[1].toLowerCase() === 'x') ||
                (value[0] === '#')
            ),
            isValidFormat;
        if (!isHexString) {
            return [0, messages];
        }
        isValidFormat = options.regexForHex.test(value);
        if (options.allowHex && !isValidFormat) {
            retVal =  -1;
            messages.push(getErrorMsgByKey('INVALID_HEX', value, options));
        }
        else if (!options.allowHex) {
            retVal = -1;
            messages.push(getErrorMsgByKey('NOT_ALLOWED_HEX', value, options));
        }
        else {
            retVal = 1;
        }
        return [retVal, messages];
    },

    validateSigned = (value, options, messages = []) => {
        let retVal = 0;
        // If no signed numbers allowed add error if number has sign
        if (!options.allowSigned && /^(:?\-|\+)/.test(value)) {
            messages.push(getErrorMsgByKey('NOT_ALLOWED_SIGNED', value, options));
            retVal = -1;
        }
        return [retVal, messages];
    },

    validateComma = (value, options, messages = []) => {
        let out = 0,
            valueHasCommas = /,/.test(value),
            replacedString;
        if (valueHasCommas) {
            if (options.allowCommas) {
                replacedString = value.replace(/,/g, '');
                if (replacedString.length === 0) {
                    messages.push(getErrorMsgByKey('NOT_A_NUMBER', value, options));
                    out = -1;
                }
                else {
                    out = 1;
                }
            }
            else if (!options.allowCommas) {
                messages.push(getErrorMsgByKey('NOT_ALLOWED_COMMA', value, options));
                out = -1;
            }
            else {
                out = 1;
            }
        }
        return [out, messages];
    },

    validateFloat = (value, options, messages = []) => {
        let out = 0;
        if (!options.allowFloat && /\.{1}/g.test(value)) {
            messages.push(getErrorMsgByKey('NOT_ALLOWED_FLOAT', value, options));
            out = -1;
        }
        return [out, messages];
    },

    validateBinary = (value, options, messages = []) => {
        let out = [0, value],
            possibleBinary = value[1] === 'b',
            isValidBinaryValue;
        if (possibleBinary) {
            if (options.allowBinary) {
                isValidBinaryValue = options.regexForBinary.test(value);
                if (isValidBinaryValue) {
                    out[0] = 1;
                    out[1] = Number(value);
                }
                else {
                    getErrorMsgByKey('INVALID_BINARY', value, options);
                    out[0] = -1;
                }
            }
            else {
                getErrorMsgByKey('NOT_ALLOWED_BINARY', value, options);
                out[0] = -1;
            }
        }
        return [out, messages];
    },

    validateOctal = (value, options, messages = []) => {
        let out = [0, value],
            possibleOctal = /^0\d/.test(value),
            isValidOctalValue;
        if (possibleOctal) {
            if (options.allowOctal) {
                isValidOctalValue = options.regexForOctal.test(value);
                if (isValidOctalValue) {
                    out[0] = 1;
                    out[1] = parseInt(value, 8);
                }
                else {
                    getErrorMsgByKey('NOT_ALLOWED_OCTAL', value, options);
                    out[0] = -1;
                }
            }
            else {
                getErrorMsgByKey('INVALID_OCTAL', value, options);
                out[0] = -1;
            }
        }
        return out;
    },

    validateScientific = (value, options, messages = []) => {
        let out = [0, value],
            possibleScientific = /\de/.test(value),
            isValidScientificValue;
        if (possibleScientific) {
            if (options.allowScientific) {
                isValidScientificValue = options.regexForScientific.test(value);
                if (isValidScientificValue) {
                    out[0] = 1;
                    out[1] = Number(value);
                }
                else {
                    getErrorMsgByKey('INVALID_SCIENTIFIC', value, options);
                    out[0] = -1;
                }
            }
            else {
                getErrorMsgByKey('NOT_ALLOWED_SCIENTIFIC', value, options);
                out[0] = -1;
            }
        }
        return out;
    },

    validateRange = (value, options, messages = []) => {
        let out = [0, value];
        if (options.checkRange) {
            if (options.inclusive && (value < options.min || value > options.max)) {
                out[0] = -1;
            }
            else if (!options.inclusive && (value <= options.min || value >= options.max)) {
                out[0] = -1;
            }
            else {
                out[0] = 1;
            }
        }
        return out;
    };

class NumberValidator extends Validator {}

// @TODO ensure types here
// @todo use template strings and function shorthand here
NumberValidator.defaultOptions = {
    messageTemplates: {
        NOT_A_NUMBER: function (value, validator) {
            return 'Value "' + value + '" is not a number (strings are allowed but must be numeric.';
        },
        NOT_IN_RANGE: function (value, validator) {
            return 'The number passed in is not ' + (validator.inclusive ? 'inclusive' : '')
                + 'ly within the specified '  + ' range. ' +
                ' Value received: "' + value + '".';
        },
        NOT_ALLOWED_FLOAT: function (value, validator) {
            return 'No floats allowed.  ' +
                'Value received: "' + value + '".';
        },
        NOT_ALLOWED_COMMA: function (value, validator) {
            return 'No commas allowed.  ' +
                'Value received: "' + value + '".';
        },
        NOT_ALLOWED_SIGNED: function (value, validator) {
            return 'No signed numbers allowed.  ' +
                'Value received: "' + value + '".';
        },
        NOT_ALLOWED_HEX: function (value, validator) {
            return 'No hexadecimal numbers allowed.  ' +
                'Value received: "' + value + '".';
        },
        NOT_ALLOWED_OCTAL: function (value, validator) {
            return 'No octal strings allowed.  ' +
                'Value received: "' + value + '".';
        },
        NOT_ALLOWED_BINARY: function (value, validator) {
            return 'No binary strings allowed.  ' +
                'Value received: "' + value + '".';
        },
        NOT_ALLOWED_SCIENTIFIC: function (value, validator) {
            return 'No scientific number strings allowed.  ' +
                'Value received: "' + value + '".';
        },
        INVALID_HEX: function (value, validator) {
            return 'Invalid hexadecimal value: "' + value + '".';
        },
        INVALID_OCTAL: function (value, validator) {
            return 'Invalid octal value: "' + value + '".';
        },
        INVALID_BINARY: function (value, validator) {
            return 'Invalid binary value: "' + value + '".';
        },
        INVALID_SCIENTIFIC: function (value, validator) {
            return 'Invalid scientific value: "' + value + '".';
        }
    },
    regexForHex: /^(?:(?:0x)|(?:\#))[\da-f]+$/i,
    regexForOctal:  /^0\d+$/,
    regexForBinary:  /^0b[01]+$/i,
    regexForScientific:  /^(?:\-|\+)?\d+(?:\.\d+)?(?:e(?:\-|\+)?\d+)?$/i,
    allowFloat:  true,
    allowCommas:  false,
    allowSigned:  true,
    allowBinary:  false,
    allowHex:  false,
    allowOctal:  false,
    allowScientific:  true,
    checkRange:  false,
    min:  Number.NEGATIVE_INFINITY,
    max:  Number.POSITIVE_INFINITY,
    inclusive: true
};

export default NumberValidator;
