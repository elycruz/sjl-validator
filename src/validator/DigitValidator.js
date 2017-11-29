/**
 * Created by Ely on 1/21/2015.
 */
import RegexValidator from "./RegexValidator";

export default class DigitValidator extends RegexValidator {
    constructor (...options) {
        super({
            pattern: /^\d+$/,
            messageTemplates: {
                DOES_NOT_MATCH_PATTERN: value =>
                    `The value passed in contains non digital characters.  ` +
                        `Value received: "${this.value}".`
            }
        }, options);
    }
}
