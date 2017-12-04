/**
 * Created by edelacruz on 7/28/2014.
 */
import NumberValidator, {validateHex, validateSigned, validateComma,
    validateFloat, validateBinary,
    validateOctal, parseSubValidationFuncs
} from '../src/validator/NumberValidator';
import Validator from '../src/validator/Validator';
import {foldl, compose, map, concat, isNumber, isArray} from 'fjl';
import {expect, assert} from 'chai';
import {peek} from './utils';

describe('sjl.validator.NumberValidator`', function () {

    // @note got algorithm from http://www.wikihow.com/Convert-from-Decimal-to-Hexadecimal
    const hexMap = [
        [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5],
        [6, 6], [7, 7], [8, 8], [9, 9], [10, 'A'], [11, 'B'],
        [12, 'C'], [13, 'D'], [14, 'E'], [15, 'F']
    ];

    function numToHex (d) {
        let q, // quotient
            r, // remainder
            a = [], // aggregated
            out = '0x',
            i;
        do {
            q = parseInt(d / 16, 10); // quotient
            r = d - (q * 16);         // remainder
            a.push(hexMap[r][1]);
            d = q;                    // dividend
        }
        while (q > 0);
        for (i = a.length - 1; i >= 0; i -= 1) {
            out += a[i];
        }
        return out;
    }

    function fib (limit) {
        let out = [],
            a = 0,
            b = 1;
        while (a <= limit) {
            out.push(a);
            if (b <= limit) {
                out.push(b);
            }
            a = a + b;
            b = a + b;
        }
        return out;
    }

    describe ('#validateHex', function () {
        it ('should return an array of type `Array<Number, Array>` as long as is receiving valid' +
            ' options object (validator or validator.options)', function () {
            const [result, messages] = validateHex('', new NumberValidator());
            expect(isNumber(result)).to.equal(true);
            expect(isArray(messages)).to.equal(true);
        });

        it ('should return `[1, []]` when receving a validly formed hex value (0x0...)', function () {
            const validator = new NumberValidator({allowHex: true}),
                results = fib(10000)
                    .map(numToHex)
                    .map((n, ind) => ind % 2 === 0 ? n.toUpperCase() : n)
                    // .map(peek)
                    .map(n => validateHex(n, validator));

               // Expect all `n` validated and messages to be empty (arrays)
               results.forEach(([n, msgs]) => {
                   expect(n).to.equal(1);
                   expect(msgs.length).to.equal(0);
               });
        });

        it ('should return `[0, []]` when value is not hex like (' +
            '   doesn\'t contain an "x" (case-insensitive) at index `1` or doesn\'t contain a "#" at index `1`', function () {
            const validator = new NumberValidator({allowHex: true}),
                results = fib(10000)
                    .map((n, ind) => ind % 2 === 0 ? n + '' : n)
                    // .map(peek)
                    .map(n => validateHex(n, validator));

            // Expect all `n` to not be validatable (`0`) a hex value
            results.forEach(([n, msgs]) => {
                expect(n).to.equal(0);
                expect(msgs.length).to.equal(0);
            });
        });

        it ('should return `[-1, [...""]]` when receiving an invalidly formed hex value (' +
            '   contains an "x" at index `1` or contains a "#" at index `1`', function () {
            const randomNonHexCharChode = () => Math.round(Math.random() * (122 - 103)) + 103,
                validator = new NumberValidator({allowHex: true}),
                results = fib(10000)
                    .map(numToHex)
                    .map((n, ind) => (n + String.fromCharCode(randomNonHexCharChode()))[
                        ind % 2 === 0 ? 'toUpperCase' : 'toLowerCase']()
                    )
                    // .map(peek)
                    .map(n => validateHex(n, validator.options));

            // Expect all `n` to not be validatable (`0`) a hex value
            results.forEach(([n, msgs]) => {
                expect(n).to.equal(-1);
                expect(msgs.length > 0).to.equal(true);
            });
        });
    });

    describe ('#validateSigned', function () {
        const values = [
                [0, 99], [0, '123123.234e20'], [0, 0xff9900]
            ],
            failingValues = [
                [-1, -3], [-1, -999.99], [-1, -0x99ff99], [-1, '+100'],
            ];
        it ('should return [-1, [...""]] when value is signed and `allowSigned` is set to ' +
            '`false`', function () {
            let validator = new NumberValidator({allowSigned: false});

            // Test for `allowSigned` is false
            values.forEach((value, index) => {
                const [result, messages] = validateSigned(value[1], validator);
                expect(result).to.equal(values[index][0]);
                expect(messages.length).to.equal(0);
            });

            // Test for `allowSigned` is false
            failingValues.forEach((pair, index) => {
                const [result, messages] = validateSigned(pair[1], validator);
                expect(result).to.equal(failingValues[index][0]);
                expect(messages.length > 0).to.equal(true);
            });
        });
        it ('should return [0, []] (unchecked) when value is signed and `allowSigned` is ' +
            '`true`.', function () {
            let validator = new NumberValidator({allowSigned: true});

            // Test for `allowSigned` is false
            values.concat(failingValues).forEach(pair => {
                const [result, messages] = validateSigned(pair[1], validator);
                expect(result).to.equal(0);
                expect(messages.length).to.equal(0);
            });

        });
    });

    describe ('#validateComma', function () {
        const valuesWithCommas = [
                [-1, ',1,000,000,000', 1000000000],
                [-1, ',', ','],
                [-1, '1,000,000', 1000000],
                [-1, '+100,000', 100000]
            ],
            valuesWithCommas2 = [
                [0, ',1,000,000,000', 1000000000],
                [0, '1,000,000', 1000000],
                [0, '+100,000', 100000]
            ],
            valuesWithoutCommas = [
                [0, 99 + ''],
                [0, '123123.234e20'],
                [0, 0xff9900 + '']
            ],
            values = valuesWithCommas.concat(valuesWithoutCommas)
        ;
        it ('should return [-1, value] when value contains comma(s) and `allowComma` is `false`.', function () {
            let validator = new NumberValidator(),
                result;

            // Test for `allowComma` is false
            values.forEach((value, index) => {
                result = validateComma(peek(value)[1], validator);
                expect(result[0]).to.equal(values[index][0]);
                // expect(result[1]).to.equal(values[index][1]);
            });
        });
        it ('should return [0, []] when value contains no commas or when `allowComma` is `true`', function () {
            // Test for `allowComma` is true
            const validator = new NumberValidator({allowCommas: true});
            valuesWithCommas2.forEach(function (value, index) {
                const [result, messages] = validateComma(value[1], validator);
                expect(result).to.equal(valuesWithCommas2[index][0]);
                expect(messages.length).to.equal(0);
            });
        });
    });

    describe ('#validateFloat', function () {
        const valuesWithFloats = [
                [-1, ',1,000,000,000.00'],
                [-1, '.', '.'],
                [-1, '1,000,000.00'],
                [-1, '+100,000.00']
            ],
            valuesWithFloats2 = [
                [0, ',1,000,000,000.00'],
                [0, '.', '.'],
                [0, '1,000,000.00'],
                [0, '+100,000.00']
            ]
        //valuesWithoutFloats = [[0, 99], [0, '123123e10'], [0, 0xff9900]],
        //values = valuesWithFloats.concat(valuesWithoutFloats),
        ;
        it ('should return [-1, [...""]] when value contains a decimal point and `allowFloat` is `false`.', function () {
            const validator = new NumberValidator({allowFloat: false});

            // Test for `allowFloat` is false
            valuesWithFloats.forEach((value, index) => {
                const result = validateFloat(value[1], validator);
                expect(result[0]).to.equal(valuesWithFloats[index][0]);
                expect(result[1].length > 0).to.equal(true);
                // expect(result[1]).to.equal(valuesWithFloats[index][1]);
            });
        });
        it ('should return [0, []] when value contains a decimal and `allowFloat` is set to `true`.', function () {
            const validator = new NumberValidator();
            //// Test for `allowFloat` is true
            validator.allowFloat = true;
            valuesWithFloats2.forEach((value, index) => {
                const result = validateFloat(value[1], validator);
                expect(result[0]).to.equal(valuesWithFloats2[index][0]);
                expect(result[1].length).to.equal(0);
                // expect(result[1]).to.equal(valuesWithFloats2[index][1]);
            });
        });
    });



});
