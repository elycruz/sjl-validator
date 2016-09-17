/**
 * Created by elyde on 1/15/2016.
 */
describe('sjl.validator.StringLengthValidator', function () {

    // ~~~ STRIP ~~~
    // This part gets stripped out when
    // generating browser version of test(s).
    'use strict';
    var chai = require('chai'),
        sjl = require('./../../src/sjl'),
        expect = chai.expect;
    // These variables get set at the top IIFE in the browser.
    // ~~~ /STRIP ~~~

    var StringLengthValidator = sjl.validator.StringLengthValidator,
        Validator = sjl.validator.Validator,
        generalValidator = new StringLengthValidator();

    function repeatStr(str, times) {
        var out = '';
        while (out.length < times) {
            out += str;
        }
        return out;
    }

    it ('should be a subclass of `Validator`.', function () {
        expect(generalValidator instanceof Validator).to.equal(true);
    });

    describe ('instance properties', function () {
        it ('should have a min and max property.', function () {
            expect(sjl.classOf(generalValidator.min)).to.equal(Number.name);
            expect(sjl.classOf(generalValidator.max)).to.equal(Number.name);
        });
        it ('should have a default value of `0` for `min` property.', function () {
            expect(generalValidator.min).to.equal(0);
        });
        it ('should have a default value of `' + Number.POSITIVE_INFINITY + '` for `max` property.', function () {
            expect(generalValidator.max).to.equal(Number.POSITIVE_INFINITY);
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
                [false, 'without', repeatStr('a', 56)],
                [false, 'without', repeatStr('b', 99)]
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
