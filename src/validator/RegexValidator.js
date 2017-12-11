/**
 * Created by Ely on 7/21/2014.
 */
import Validator, {ValidationResult} from "./ValidationOptions";
import {getErrorMsgByKey} from "./ValidationOptions";
import {curry} from 'fjl';

export const

    validate = (value, options) => {
        const result = options.pattern.test(value),

            // If test failed
            messages = !result ?
                [getErrorMsgByKey('DOES_NOT_MATCH_PATTERN', value, options)] :
                [];

        return new ValidationResult({
            result,
            messages,
            value
        });
    },

    regexValidator = curry((options, value) => {
        return validate (value, new RegexValidator(options));
    });

RegexValidator.defaultOptions = {
    pattern: /./,
    messageTemplates: {
        DOES_NOT_MATCH_PATTERN: (value, options) =>
            'The value passed in does not match pattern"'
            + options.pattern + '".  Value passed in: "'
            + options.value + '".'
    }
};
