/**
 * Created by Ely on 7/21/2014.
 */
import Validator, {ValidationResult, getErrorMsgByKey} from "./Validator";

export const
    validate = (value, options) => {
        const result = !isEmpty(value),
            // If test failed
            messages = !result ? [getErrorMsgByKey(
                'EMPTY_NOT_ALLOWED', value, options
            )] : [];
        return new ValidationResult({result, messages, value});
    }
;

export default class NotEmptyValidator extends Validator {
    constructor (...options) {
            super({
                messageTemplates: {
                    EMPTY_NOT_ALLOWED: () =>
                        'Empty values are not allowed.'
                }
            }, ...options);
        };

    validate (value) {
        const result = validate(value, this);
        this.messages = result.messages;
        return result;
    }
}
