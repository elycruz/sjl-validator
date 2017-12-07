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

    runValidators = (validators, value, options) => {
        const limit = validators.length,
            {breakOnFailure} = options,
            results = [];
        let i = 0,
            result = true;

        // Run validators
        for (; i < limit; i++) {
            const validator = validators[i],
                vResult = validator === 'object' ?
                    validator.validate(value) : validator(value, options),
            {result: interimResult, messages: msgs} = vResult;
            results.push(vResult);
            if (!interimResult) {
                result = false;
                if (breakOnFailure) {
                    break;
                }
            }
        }

        // Return result
        return new ValidationResult({
            result,
            value,

            // if messages pull them out and concat into one array or empty array
            messages: !result ? concat(results.map(({messages}) => messages)) : []
        });
    },

    runFilters = (filters, value) => filters.length ?
        apply(compose, filters)(value) : value,

    processInput = (value, input) => {

    }

;

export class Input {
    constructor (options) {
        defineEnumProps$([
            [String,    'name', ''],
            [Boolean,   'required', true],
            [Array,     'filters', []],
            [Array,     'validators', []],
            [Boolean,   'breakOnFailure', false],

            // Protect from adding programmatic validators,
            // from within `isValid`, more than once
            [Boolean, 'validationHasRun', false], // @todo evaluate the necessity
                                                // of this functionality
        ], this);
        if (isString(options)) {
            this.name = options;
        }
        else if (options) {
            assign(this, options);
        }
    }

    validate (value) {
        return validate(value, this);
    }

    isValid (value) {
        return validate(value, this).result;
    }

    filter (value) {
        // If valid return filtered else return current
        return this.validate(value).result ?
            runFilters(this.filters, value) :
            value;
    }

}

export default Input;
