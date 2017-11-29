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
            {messageTemplate, messages} = self;
        if (!messageTemplate[key]) {
            return self;
        }
        if (isFunction(key)) {
            messages.push(call(key, value, self.options));
        }
        if (isFunction(messageTemplate[key])) {
            messages.push(call(messageTemplate[key], value, self.options));
        }
        else {
            messages.push(messageTemplate[key]);
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
