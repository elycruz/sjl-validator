/**
 * Created by edelacruz on 7/28/2014.
 */
import NumberValidator, {validateHex, validateOctal, parseValidationFuncs} from '../src/validator/NumberValidator';
import Validator from '../src/validator/Validator';
import {foldl, compose, map, concat, isNumber, isArray} from 'fjl';
import {expect, assert} from 'chai';
import {log, peek} from './utils';

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

});
