/**
 * Created by Ely on 1/21/2015.
 */
import Validator, {ValidationResult, getErrorMsgByKey, ValidationOptions} from "./Validator";
import {typeOf, apply, assign, concat, assignDeep} from 'fjl';
import {defineEnumProps$} from 'fjl-mutable';

export const validate = (value, options) => {
    const messages = [],
        isOfType = isString(value),
        isWithinRange = value >= options.min && value <= options.max;
    if (!isOfType) {
        messages.push(getErrorMsgByKey('NOT_OF_TYPE', value, options));
    }
    else if (!isWithinRange) {
        messages.push(getErrorMsgByKey('NOT_WITHIN_RANGE', value, options));
    }
    return new ValidationResult({
        result: isOfType && isWithinRange,
        messages,
        value
    });
};

export class StringLengthOptions {
    constructor(options) {
        defineEnumProps$([
            [Number, 'min', Number.MIN_SAFE_INTEGER],
            [Number, 'max', Number.MAX_SAFE_INTEGER]
        ], this);
        if (options) {
            assign(this, options);
        }
    }
}

export default class StringLengthValidator extends Validator {
    constructor (options) {
        super(new StringLengthOptions(options));
    }

    validate (value) {
        const result = validate(value, this.options);
        this.messages = result.messages;
        return result;
    }
}

StringLengthValidator.messageTemplates = {
    NOT_OF_TYPE: (value) => `Value is not a String.  ` +
        `Value type received: ${typeOf(value)}.` +
        `Value received: "${value}".`,
    NOT_WITHIN_RANGE: (value, options) => `Value is not within range ` +
        `${options.min} to ${options.max}.` +
        `Value length given: "` + value.length + `".` +
        `Value received: "` + value + `".`
};
