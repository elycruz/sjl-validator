/**
 * Created by Ely on 7/21/2014.
 * Initial idea borrowed from Zend Framework 2's Zend/Validator
 */
import {assignDeep, assign, isset,
    isType, typeOf, call, isFunction,
    apply, repeat,
    concat, curry} from 'fjl';

import {defineEnumProps$} from 'fjl-mutable';

export const

    defaultValueObscurator = x => repeat((x + '').length, '*'),

    getErrorMsgByKey = curry((options, key, value) => {
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
    });

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

export class ValidationOptions {
    constructor (...options) {
        const {defaultOptions} = this.constructor;
        defineEnumProps$([
            [Number, 'messagesMaxLength', 100],
            [Object, 'messageTemplates', {}],
            [Boolean, 'valueObscured', false],
            [Function, 'valueObscurator', defaultValueObscurator]
        ], this);
        if (options.length) {
            assignDeep.apply(null, [this, defaultOptions].concat(options.filter(isset)));
        }
    }
}

ValidationOptions.defaultOptions = {
    messageTemplates: {}
};

export default ValidationOptions;
