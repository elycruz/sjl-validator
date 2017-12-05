/**
 * Created by Ely on 7/24/2014.
 * This is a crude implementation
 * @todo review if we really want to have fallback value
 *      functionality for javascript
 */
import {defineEnumProps$} from 'fjl-mutable';
import {assign, compose, concat, isString, isUndefined} from 'fjl';
import {ValidationResult} from "../validator/Validator";

export const

    validate = (value, input) => {
        const {validators, filters, breakOnFailure} = input,
            validationResult = runValidators(validators, value, breakOnFailure),
            {result} = validationResult;

        if (result) {
            validationResult.filteredValue = runFilters(filters, value);
            validationResult.value = value;
        }

        return new ValidationResult(validationResult);
    },

    runValidators = (validators, value, breakOnFailure) => {
        const limit = validators.length,
            results = [];
        let result = true,
            i;

        for (i = 0; i < limit; i += 1) {
            const [isValid, messages] = validators[i](value);
            results.push([result, messages]);
            if (!isValid) {
                result = false;
                if (breakOnFailure) {
                    break;
                }
            }
        }

        // Return result
        return {
            result,
            value,

            // if messages pull them out and concat into one array or empty array
            messages: !result ? concat(results.map(([_, msgs]) => msgs)) : []
        };
    },

    runFilters = (filters, value) => apply(compose, filters)(value)
;

export class Input {
    constructor (options) {
        defineEnumProps$([
            [String,    'name', ''],
            [Boolean,   'required', true],
            [Array,     'filters', []],
            [Array,     'validators', []],
            [Boolean,   'allowEmpty', false],
            [Boolean,   'continueIfEmpty', false],
            [Boolean,   'breakOnFailure', false],

            // Protect from adding programmatic validators,
            // from within `isValid`, more than once
            [Array, 'validationHasRun', false], // @todo evaluate the necessity
                                                // of this functionality
        ], this);

        this.fallbackValue = undefined;

        if (isString(options)) {
            this.name = options;
        }
        else if (options) {
            assign(this, options);
        }
    }

    isValid (value) {
        return validate(value, input);
    }

}
