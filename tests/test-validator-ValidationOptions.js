/**
 * Created by elyde on 1/15/2016.
 */
import {typeOf, keys} from 'fjl';
import {expect, assert} from 'chai';
import {log, peek} from './utils';

import {validationOptions} from '../src/validator/ValidationOptions';

describe('sjl.validator.ValidationOptions', function () {

    describe('#Construction', function () {
        it('should merge incoming options to `self` on construction', function () {
            const messageTemplates = {
                    A: 'some message',
                    B: value => `some message with value in it.  Value: ${value}`
                },
                v = validationOptions({messageTemplates});

            log(v);

            // Ensure passed in allowed type is merged in
            keys(messageTemplates).forEach(key => {
                expect(v.messageTemplates[key]).to.equal(messageTemplates[key]);
            });

            // Ensure not allowed type is blocked
            // messages must be of type `Array` so should throw error
            assert.throws(() => validationOptions({messageTemplates: 99}), Error);
        });

        const expectedPropertyAndTypes = {
                messagesMaxLength: 'Number',
                valueObscured: 'Boolean',
                valueObscurator: 'Function',
                messageTemplates: 'Object'
            };

        it('should have the expected properties as expected types.', function () {
            let validator = validationOptions();
            Object.keys(expectedPropertyAndTypes).forEach(key => {
                expect(validator.hasOwnProperty(peek(key))).to.equal(true);
                expect(typeOf(validator[key])).to.equal(expectedPropertyAndTypes[key]);
            });
        });
    });

    describe('#getErrorMsgByKey', function () {
        const messageTemplates = {
                EMPTY_NOT_ALLOWED: 'Empty values are not allowed.',
                EXAMPLE_CASE: value => `Some case is not allowed for value ${value}`
            },
            v = validationOptions({messageTemplates});
        it('should return a `string` when key exists on options.messageTemplates', function () {
            expect(isString(getErrorMsgByKey(v, value, 'EMPTY_NOT_ALLOWED'))).to.equal(true);
            expect(v.getErrorMsgByKey('EXAMPLE_CASE')).to.equal(v);
            expect(v.getErrorMsgByKey(value => 'Inline error message callback')).to.equal(v);
        });
        it('should added errors should be in `messages` property', function () {
            expect(v.messages.length).to.equal(3);
            expect(v.messages[0]).to.equal(messageTemplates.EMPTY_NOT_ALLOWED);
            expect(v.messages[1]).to.equal(messageTemplates.EXAMPLE_CASE());
            expect(v.messages[2]).to.equal('Inline error message callback');
        });
        it('should do nothing to `messages` if `key` is not a function and `key` doesn\'t exist on ' +
            '`messageTemplates`', function () {
            expect(v.getErrorMsgByKey('SOME_OTHER_CASE')).to.equal(v);
            expect(v.messages.length).to.equal(3);
        });
    });

});
