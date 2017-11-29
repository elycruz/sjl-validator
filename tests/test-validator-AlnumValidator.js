/**
 * Created by elyde on 1/15/2016.
 */
import AlnumValidator from '../src/validator/AlnumValidator';
import Validator from '../src/validator/Validator';
import {expect, assert} from 'chai';

describe('sjl.validator.AlnumValidator', function () {

    it ('should be a subclass of `Validator`.', function () {
        let  validator = new AlnumValidator();
        expect(validator instanceof Validator).to.equal(true);
    });

    it ('should return `true` value is `alpha numeric` and `false` otherwise.', function () {
        let  validator = new AlnumValidator(),
            values = [
                [true, 'helloworld'],
                [true, 'testingtesting123testingtesting123'],
                [true, 'sallysellsseashellsdownbytheseashore'],
                [false, 'hello[]world'],
                [false, '99 bottles of beer on the wall']
            ];

        // Validate values and expect value[0] to be return value of validation check
        values.forEach(value => {
            expect(validator.isValid(value[1])).to.equal(value[0]);
            if (!value[0]) {
                expect(validator.messages.length).to.equal(1);
            }
        });
    });

});
