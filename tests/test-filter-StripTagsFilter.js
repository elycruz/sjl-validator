/**
 * Created by Ely on 3/30/2016.
 */
import StripTagsFilter, {createTagRegexPartial} from '../src/filter/StripTagsFilter';
import {expect, assert} from 'chai';
import {typeOf} from 'fjl';


describe('sjl.filter.StripTagsFilter', function () {

    describe ('#createTagRegexPartial', function () {
        it ('should return a regular expression', function () {
            expect(createTagRegexPartial()).to.be.instanceOf(RegExp);
        });
    });

    //
    // describe('filter.StripTagsFilter.filter', function () {
    //         StripTagsFilter.filter(
    //             '<html lang="eng" lang="chinese" mambo="no.3">' +
    //             '<head mambo="no.9" mambo="hello" mambo="what is your name?">Hello</head>Hello World' +
    //             '<head>Hello</head><!-- This is a comment.  Hello World x2. -->Hello World' +
    //             '<head style="display: inline-block;">Hello</head>Hello World' +
    //             '<head>Hello<p>Carlos Patatos</p></head>Hello World' +
    //             '</html>', ['p'], ['lang', 'style', 'mambo'], true);
    // });

});
