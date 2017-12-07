/**
 * Created by Ely on 3/30/2016.
 */
import StripTagsFilter, {createTagRegexPartial} from '../src/filter/StripTagsFilter';
import {expect, assert} from 'chai';
import {typeOf, isString, subsequences} from 'fjl';
import {peek, genRanStr} from './utils';

describe('sjl.filter.StripTagsFilter', function () {

    describe ('#createTagRegexPartial', function () {
        it ('should return a string of length greater than `0`', function () {
            expect(isString(createTagRegexPartial())).to.equal(true);
            expect(createTagRegexPartial().length > 0).to.equal(true);
        });
        it ('should return a well constructed regex partial (string) that can be passed to `RegExp` constructor', function () {
            expect(new RegExp(createTagRegexPartial('p'), 'gum')).to.be.instanceOf(RegExp);
        });
        it ('should return a regex that can validate html tag formats', function () {
            const names = subsequences('abc-_:'.split('')); // simple tag format for now
            expect(
                names.every(tag => {
                    const tagName = tag.join(''),
                        r = new RegExp(createTagRegexPartial(tagName), 'gum'),
                        openTag = `<${tagName}>`,
                        closeTag = `</${tagName}>`,
                        randomContent = genRanStr(0, 100)
                    ;
                    return !tagName.length ? true :
                        subsequences([openTag, randomContent, closeTag])
                            .filter(x => x !== randomContent && !!x)
                            .every(xs => r.test(peek(xs).join('')));
                })
            ).to.equal(true);
        });
    });

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
