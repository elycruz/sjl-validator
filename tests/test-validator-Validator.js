/**
 * Created by elyde on 1/15/2016.
 */
import {typeOf} from 'fjl';
import {expect} from 'chai';
import Validator from '../src/validator/Validator';

describe ('sjl.validator.Validator', function () {

    const expectedPropertyAndTypes = {
            messages: 'Array',
            messagesMaxLength: 'Number',
            messageTemplates: 'Object',
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
        var validator = new Validator();
        Object.keys(expectedPropertyAndTypes).forEach(key => {
            expect(validator.hasOwnProperty(key)).to.equal(true);
            expect(typeOf(validator[key])).to.equal(expectedPropertyAndTypes[key]);
        });
    });

    it('should have the expected methods.', function () {
        var validator = new Validator();
        expectedMethodNames.forEach(function (methodName) {
            expect(typeof validator[methodName]).to.equal('function');
            expect(typeof Validator.prototype[methodName]).to.equal('function');
        });
    });

});
