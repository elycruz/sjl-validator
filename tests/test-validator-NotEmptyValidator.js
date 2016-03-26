/**
 * Created by elyde on 1/15/2016.
 */
// Make test suite directly interoperable with the browser
if (typeof window === 'undefined') {
    var chai = require('chai'),
        sjl = require('sjljs');
}

// Get chai.expect
if (typeof expect === 'undefined') {
    var expect = chai.expect;
}

var NotEmptyValidator = sjl.ns.refactor.validator.NotEmptyValidator,
    Validator = sjl.ns.refactor.validator.Validator;

describe('sjl.ns.validator.NotEmptyValidator', function () {

    it ('should be a subclass of `Validator`.', function () {
        var validator = new NotEmptyValidator();
        expect(validator instanceof Validator).to.equal(true);
    });

    it ('should return `true` for `validate` and `isValid` if value is not `empty`.', function () {
        var validator = new NotEmptyValidator();
        ['hello', 99, true, [1], {a: 1}].forEach(function (value) {
            expect(validator.validate(value)).to.equal(true);
            expect(validator.isValid(value)).to.equal(true);
        });
    });

    it ('should return `false` for `validate` and `isValid` if value is `empty`.', function () {
        var validator = new NotEmptyValidator();
        ['', 0, false, [], {}].forEach(function (value) {
            expect(validator.validate(value)).to.equal(false);
            expect(validator.isValid(value)).to.equal(false);
        });
    });

    it ('should have messages when `validate` returns false.', function () {
        var validator = new NotEmptyValidator();
        ['', 0, false, [], {}].forEach(function (value) {
            expect(validator.validate(value)).to.equal(false);
            expect(validator.messages.length > 0).to.equal(true);
        });
    });

});
