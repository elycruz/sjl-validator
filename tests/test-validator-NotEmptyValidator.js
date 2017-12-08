/**
 * Created by elyde on 1/15/2016.
 */
import NotEmptyValidator from '../src/validator/NotEmptyValidator';
import Validator from '../src/validator/ValidationOptions';
import {expect, assert} from 'chai';

describe('sjl.validator.NotEmptyValidator', function () {

    it ('should be a subclass of `Validator`.', function () {
        let validator = new NotEmptyValidator();
        expect(validator instanceof Validator).to.equal(true);
    });

    it ('should return `true` for `validate` and `isValid` if value is not `empty`.', function () {
        let validator = new NotEmptyValidator();
        ['hello', 99, true, [1], {a: 1}].forEach(function (value) {
            expect(validator.isValid(value)).to.equal(true);
        });
    });

    it ('should return `false` for `validate` and `isValid` if value is `empty`.', function () {
        let validator = new NotEmptyValidator();
        ['', 0, false, [], {}].forEach(function (value) {
            expect(validator.isValid(value)).to.equal(false);
        });
    });

    it ('should have messages when `validate` returns false.', function () {
        let validator = new NotEmptyValidator();
        ['', 0, false, [], {}].forEach(function (value) {
            expect(validator.isValid(value)).to.equal(false);
            expect(validator.messages.length > 0).to.equal(true);
        });
    });

});
