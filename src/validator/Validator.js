/**
 * Created by Ely on 7/21/2014.
 * Initial idea borrowed from Zend Framework 2's Zend/Validator
 */
import {assignDeep, isset, isType, typeOf, call, isFunction} from 'fjl';

import {defineEnumProps$} from 'fjl-mutable';

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
        const self = this,
            {messageTemplates, messages} = self;
        if (isFunction(key)) {
            messages.push(call(key, value, self));
        }
        else if (!messageTemplates[key]) {
            return self;
        }
        else if (isFunction(messageTemplates[key])) {
            messages.push(call(messageTemplates[key], value, self));
        }
        else {
            messages.push(messageTemplates[key]);
        }
        return self;
    }

    clearMessages () {
        this.messages = [];
        return this;
    }

    validate (value) {
        return this.isValid(value);
    }

    isValid (/*value*/) {
        throw Error('Can not instantiate `Validator` directly.  It should be extended instead.');
    }

}
