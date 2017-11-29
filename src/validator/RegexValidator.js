/**
 * Created by Ely on 7/21/2014.
 */
import Validator, {ValidationResult} from "../../src/validator/Validator";

export default class RegexValidator extends Validator {
    constructor(...options) {
        super({
            pattern: /./,
            messageTemplates: {
                DOES_NOT_MATCH_PATTERN: (value, validator) =>
                    'The value passed in does not match pattern"'
                        + validator.pattern + '".  Value passed in: "'
                        + validator.value + '".'
            }
        }, options);
    }

    validate (value) {
        const self = this.clearMessages(),
            result = self.pattern.test(value);

        // If test failed
        if (!result) {
            self.addErrorByKey('DOES_NOT_MATCH_PATTERN');
        }

        return new ValidationResult({
            result,
            messages: this.messages.slice(0),
            value
        });
    }

}
