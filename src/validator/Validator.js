/**
 * Created by Ely on 7/21/2014.
 * Initial idea borrowed from Zend Framework 2's Zend/Validator
 */
import {assignDeep, isset, isType, typeOf, call, isFunction} from 'fjl';

import {defineEnumProps$} from 'fjl-mutable';

export const

    addErrorByKey = (key, value, validator) => {
        const {messageTemplates, messages} = validator;
        if (isFunction(key)) {
            messages.push(call(key, value, validator));
        }
        else if (!messageTemplates[key]) {
            return validator;
        }
        else if (isFunction(messageTemplates[key])) {
            messages.push(call(messageTemplates[key], value, validator));
        }
        else {
            messages.push(messageTemplates[key]);
        }
        return validator;
    },

    clearMessages = validator => {
        validator.messages = [];
        return validator;
    };

export default class Validator {

    constructor (options) {
        defineEnumProps$([
            [Array, 'messages', []],
            [Number, 'messagesMaxLength', 100],
            [Object, 'messageTemplates', {}],
            [Boolean, 'valueObscured', false]
        ], this);
        if (options) {
            assignDeep(this, options);
        }
    }

    addErrorByKey (key, value) {
        return addErrorByKey(key, value, this);
    }

    clearMessages () {
        return clearMessages(this);
    }

    validate (value) {
        return this.isValid(value);
    }

    isValid (/*value*/) {
        throw Error('Can not instantiate `Validator` directly.  It should be extended instead.');
    }

}
