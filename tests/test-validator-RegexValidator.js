/**
 * Created by edelacruz on 7/28/2014.
 */
import {regexValidator, regexValidatorOptions} from '../src/validator/RegexValidator';
import {expect, assert} from 'chai';
import {typeOf} from 'fjl';

describe('sjl.validator.RegexValidator`', function () {

    function regexTest(keyValMap, expected) {
        Object.keys(keyValMap).map(key => {
            it('should return ' + expected + ' when testing "' + key + '" with "' + keyValMap[key] + '".', function () {
                const value = keyValMap[key],
                    {result, messages} = regexValidator({pattern: new RegExp(key, 'i')}, value);
                expect(result).to.equal(expected);
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
