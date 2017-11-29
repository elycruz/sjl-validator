/**
 * Created by elyde on 1/15/2016.
 */
import {typeOf, keys} from 'fjl';
import {expect, assert} from 'chai';

import Validator from '../src/validator/Validator';

describe('sjl.validator.Validator', function () {

    describe('#Construction', function () {
        it('should merge incoming options to `self` on construction', function () {
            const messageTemplates = {
                    A: 'some message',
                    B: value => `some message with value in it.  Value: ${value}`
                },
                messages = ['a', 'b', 'b'],
                v = new Validator({messageTemplates, messages});

            // Ensure passed in allowed type is merged in
            keys(messageTemplates).forEach(key => {
                expect(v.messageTemplates[key]).to.equal(messageTemplates[key]);
            });

            // Ensure not allowed type is blocked
            // messages must be of type `Array` so should throw error
            assert.throws(() => new Validator({messages: ''}), Error);

            // Ensure one more positive case
            const v2 = new Validator({messages});
            v2.messages.forEach((m, ind) => {
                expect(m).to.equal(messages[ind]);
            });
        });

        const expectedPropertyAndTypes = {
                messages: 'Array',
                messagesMaxLength: 'Number',
                valueObscured: 'Boolean'
                // value: 'Null'
            },
            expectedMethodNames = [
                'addErrorByKey',
                'clearMessages',
                'validate',
                'isValid'
            ];

        it('should have the expected properties as expected types.', function () {
            let validator = new Validator();
            Object.keys(expectedPropertyAndTypes).forEach(key => {
                expect(validator.hasOwnProperty(key)).to.equal(true);
                expect(typeOf(validator[key])).to.equal(expectedPropertyAndTypes[key]);
            });
        });

        it('should have the expected methods.', function () {
            let validator = new Validator();
            expectedMethodNames.forEach(function (methodName) {
                expect(typeof validator[methodName]).to.equal('function');
                expect(typeof Validator.prototype[methodName]).to.equal('function');
            });
        });
    });

    describe('#addErrorByKey', function () {
        const messageTemplates = {
                EMPTY_NOT_ALLOWED: 'Empty values are not allowed.',
                EXAMPLE_CASE: value => `Some case is not allowed for value ${value}`
            },
            v = new Validator({messageTemplates});
        it('should be able to add error messages by key (whether value of `key` on ' +
            '`messageTemplates` is a function or a string, or whether `key` itself is a function.  ' +
            'Should return itself', function () {
            expect(v.addErrorByKey('EMPTY_NOT_ALLOWED')).to.equal(v);
            expect(v.addErrorByKey('EXAMPLE_CASE')).to.equal(v);
            expect(v.addErrorByKey(value => 'Inline error message callback')).to.equal(v);
        });
        it('should added errors should be in `messages` property', function () {
            expect(v.messages.length).to.equal(3);
            expect(v.messages[0]).to.equal(messageTemplates.EMPTY_NOT_ALLOWED);
            expect(v.messages[1]).to.equal(messageTemplates.EXAMPLE_CASE());
            expect(v.messages[2]).to.equal('Inline error message callback');
        });
        it('should do nothing to `messages` if `key` is not a function and `key` doesn\'t exist on ' +
            '`messageTemplates`', function () {
            expect(v.addErrorByKey('SOME_OTHER_CASE')).to.equal(v);
            expect(v.messages.length).to.equal(3);
        });
    });

    describe('#clearMessages', function () {
        it('should clear messages property back to an empty array.  It should return itself', function () {
            const v = new Validator();
            v.messages.push('a', 'b', 'c');
            expect(v.clearMessages()).to.equal(v);
            expect(v.messages.length).to.equal(0);
        });
    });

    describe('#validate', function () {
        it('should throw an error when called from base class', function () {
            assert.throws(() => v.validate(), Error);
        });
    });

    describe('#isValid', function () {
        it('should throw an error when called from base class', function () {
            assert.throws(() => v.isValid(), Error);
        });
    });

});
