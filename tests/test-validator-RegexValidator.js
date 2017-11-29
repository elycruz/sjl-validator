/**
 * Created by edelacruz on 7/28/2014.
 */
import RegexValidator from '../src/validator/DigitValidator';
import Validator from '../src/validator/Validator';
import {expect, assert} from 'chai';
import {typeOf} from 'fjl';

describe('sjl.validator.RegexValidator`', function () {

    it('should be a subclass of `Validator`.', function () {
        expect((new RegexValidator()) instanceof Validator).to.equal(true);
        expect((new RegexValidator()) instanceof RegexValidator).to.equal(true);
    });

    function regexTest(keyValMap, expected) {
        Object.keys(keyValMap).map(key => {
            it('should return ' + expected + ' when testing "' + key + '" with "' + keyValMap[key] + '".', function () {
                const value = keyValMap[key],
                validator = new RegexValidator({pattern: new RegExp(key, 'i')});
                console.log(validator.pattern, 'value', validator.pattern.test(value));
                expect(validator.isValid(value)).to.equal(expected);
            });
        });
    }

    let truthyMap = {
            '^\\d+$': 199, // Unsigned Number
            '^[a-z]+$': 'abc', // Alphabetical
            '^(:?\\+|\\-)?\\d+$': -100 // Signed Number
        },
        falsyMap = {
            '^\\d+$': '-199edd1', // Unsigned Number
            '^[a-z]+$': '0123a12bc', // Alphabetical
            '^(:?\\+|\\-)?\\d+$': '-10sd0e+99' // Signed Number
        };

    // Run tests
    regexTest(truthyMap, true);
    regexTest(falsyMap, false);

});
