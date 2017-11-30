import StringLengthValidator from '../src/validator/StringLengthValidator';
import Validator from '../src/validator/Validator';
import {typeOf, repeat} from 'fjl';
import {expect} from 'chai';

/**
 * Created by elyde on 1/15/2016.
 */
describe('sjl.validator.StringLengthValidator', function () {

    const generalValidator = new StringLengthValidator();

    it ('should be a subclass of `Validator`.', function () {
        expect(generalValidator instanceof Validator).to.equal(true);
    });

    describe ('instance properties', function () {
        it ('should have a min and max property.', function () {
            expect(typeOf(generalValidator.min)).to.equal(Number.name);
            expect(typeOf(generalValidator.max)).to.equal(Number.name);
        });
        it ('should have a default value of `0` for `min` property.', function () {
            expect(generalValidator.min).to.equal(0);
        });
        it ('should have a default value of `' + Number.MAX_SAFE_INTEGER + '` for `max` property.', function () {
            expect(generalValidator.max).to.equal(Number.MAX_SAFE_INTEGER);
        });
    });

    it ('should return `true` value.length is within default range.', function () {
        var validator = new StringLengthValidator(),
            values = [
                [true, 'helloworld'],
                [true, 'testingtesting123testingtesting123'],
                [true, 'sallysellsseashellsdownbytheseashore'],
                [true, 'hello[]world'],
                [true, '99 bottles of beer on the wall']
            ];

        // Validate values and expect value[0] to be return value of validation check
        values.forEach(function (value) {
            expect(validator.isValid(value[1])).to.equal(value[0]);
        });

        // Expect messages for falsy values
        expect(validator.messages.length).to.equal(0);
    });

    describe ('isValid with set min and max values', function () {
        var validator = new StringLengthValidator({min: 0, max: 55}),
            values = [
                [true, 'within', 'helloworld'],
                [true, 'within', 'testingtesting123testingtesting123'],
                [true, 'within', 'sallysellsseashellsdownbytheseashore'],
                [true, 'within', 'hello[]world'],
                [true, 'within', '99 bottles of beer on the wall'],
                [false, 'without', repeat(56, 'a')],
                [false, 'without', repeat(99, 'b')]
            ];

        // Validate values and expect value[0] to be return value of validation check
        values.forEach(function (args) {
            it ('should return `' + args[0] + '` when value.length is '+ args[1] +' allowed range.', function () {
                expect(validator.isValid(args[2])).to.equal(args[0]);
            });
        });

        // Expect messages for falsy values
        expect(validator.messages.length).to.equal(0);
    });

});
