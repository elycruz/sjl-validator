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

class AlnumValidator extends Validator {
    validate (value) {
        const result = validate(value, this);
        this.messages = result.messages;
        return result;
    }
}

AlnumValidator.isAlnum = isAlnum;

AlnumValidator.defaultOptions = {
    messageTemplates: {
        NOT_ALPHA_NUMERIC: value =>
            `Value is not alpha-numeric.  Value received: "${value}".`
    }
};

export default AlnumValidator;
