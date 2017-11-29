/**
 * Created by Ely on 1/21/2015.
 */
import {assignDeep} from 'fjl';
import Validator, {ValidationResult, getErrorMsgByKey} from "./Validator";

export const

    isAlnum = x => /^[\da-z]+$/i.test(x),

    validate = (value, validator) => {
        const result = value && isAlnum(value),

            // If test failed
            messages = !result ? [getErrorMsgByKey(
                'NOT_ALPHA_NUMERIC', value, validator
            )] : [];

        return new ValidationResult({result, messages, value});
    };

export class AlnumValidator extends Validator {
    validate (value) {
        const result = validate(value, this);
        this.messages = result.messages;
        return result;
    }
}

Object.defineProperties(AlnumValidator, {
    isAlnum: {
        value: isAlnum,
        enumerable: true
    },
    messageTemplates: {
        value: {
            NOT_ALPHA_NUMERIC: value =>
                `Value is not alpha-numeric.  Value received: "${value}".`
        },
        enumerable: true
    }
});

export default AlnumValidator;
