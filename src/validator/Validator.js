/**
 * Created by Ely on 7/21/2014.
 * Initial idea borrowed from Zend Framework 2's Zend/Validator
 */
import {assignDeep, assign, isset,
    isType, typeOf, call, isFunction,
    apply, repeat,
    concat} from 'fjl';

import {defineEnumProps$, defineEnumProp$} from 'fjl-mutable';

export const

    defaultValueObscurator = x => repeat((x + '').length, '*'),

    getErrorMsgByKey = (key, value, options) => {
        let message;
        const {messageTemplates, valueObscured, valueObscurator} = options,
            _value = valueObscured ? valueObscurator(value) : value;
        if (isFunction(key)) {
            message = call(key, _value, options);
        }
        else if (!messageTemplates[key]) {
            return '';
        }
        else if (isFunction(messageTemplates[key])) {
            message = call(messageTemplates[key], _value, options);
        }
        else {
            message = messageTemplates[key];
        }
        return message;
    },

    clearMessages = validator => {
        validator.messages = [];
        return validator;
    };

export class ValidationOptions {
    constructor (...options) {
        defineEnumProps$([
            [Number, 'messagesMaxLength', 100],
            [Object, 'messageTemplates', {}],
            [Boolean, 'valueObscured', false],
            [Function, 'valueObscurator', defaultValueObscurator]
        ], this);
        if (options.length) {
            assignDeep.apply(null, [this].concat(options.filter(isset)));
        }
    }
}

export class ValidationResult {
    constructor (options) {
        defineEnumProps$([
            [Boolean, 'result', false],
            [Array, 'messages', []]
        ], this);
        this.value = undefined;
        this.filteredValue = undefined;
        assign(this, options);
    }
}

export default class Validator {
    constructor (options = {}) {
        const {defaultOptions} = this.constructor;
        defineEnumProps$([
            [Array, 'messages', []],
            [ValidationOptions, 'options', new ValidationOptions(
                defaultOptions, options
            )]
        ], this);

        // Merge options to self for easier access
        assignDeep(this, this.options);
    }

    addErrorByKey (key, value) {
        const message = getErrorMsgByKey(key, value, this);
        if (message) {
            this.messages.push(message);
        }
        return this;
    }

    clearMessages () {
        return clearMessages(this);
    }

    validate (/*value*/) { // Returns `ValidationResult`
        throw Error('This method should be overwritten by extending class.');
    }

    isValid (value) {
        return this.validate(value).result;
    }

}

Validator.messageTemplates = {};
