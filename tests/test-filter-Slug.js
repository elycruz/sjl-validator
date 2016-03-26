/**
 * Created by elydelacruz on 3/25/16.
 */
'use strict';

let expect = require('chai').expect,
    sjl = require('sjljs'),
    ns = require('../src/namespace'),
    Alias = ns.filter.Alias,
    Slug = ns.filter.Slug,
    testUtils = ns.utils.testUtils;

function filterDataProvider() {
    return [
        [{
            'unfiltered': 'Hello.  What is your name?',
            'filtered': 'hello-what-is-your-name'
        }],
        [{
            'unfiltered': 'Thrice as nice!',
            'filtered': 'thrice-as-nice'
        }],
        [{
            'unfiltered': 'hello%world',
            'filtered': 'hello-world'
        }],
        [{
            'unfiltered': 'unaffected-value;',
            'filtered': 'unaffected-value'
        }],
        [{
            'unfiltered': "some' other' value",
            'filtered': "some-other-value"
        }],
        [{
            'unfiltered': " \\ \\ \\ \\ ",
            'filtered': ""
        }],
        [{
            'unfiltered': "Not needing escape.",
            'filtered': "not-needing-escape"
        }],
        [{
            'unfiltered': "All your base are belong to us.",
            'filtered': "all-your-base-are-belong-to-us"
        }],
        [{
            'unfiltered': ";All ;your ;base ;are ;belong ;to ;us.",
            'filtered': "all-your-base-are-belong-to-us"
        }]
    ];
}

function invalidFilterCandidateProvider() {
    return [
        // Not of correct type for test:  Should throw exception
        [function () {}],
        // Not of correct type for test;  Should throw exception
        [true],
        // Not of correct type for test;  Should throw exception
        [99]
    ];
}

describe(
    '#filter.Slug,' +
    ' #filter.Slug#filter,' +
    ' #filter.Slug.filter', function () {
    var filter = new Slug();
    filterDataProvider().forEach(function (args) {
        var filteredValue = args[0].filtered,
            unfilteredValue = args[0].unfiltered;
        it(`should return slug ${filteredValue} when \`value\` is ${unfilteredValue}.`, function () {
            expect(filter.filter(unfilteredValue)).to.equal(filteredValue);
            expect(Slug.filter(unfilteredValue)).to.equal(filteredValue);
            expect(Slug(unfilteredValue)).to.equal(filteredValue);
        });
    });

    //it ('should throw an error when attempting to filter unsupported values.', function () {
    //    invalidFilterCandidateProvider()[0].forEach(function (args) {
    //        return expect(Slug(args[0])).to.throw(Error);
    //    });
    //});
});

describe(
    '#filter.Alias,' +
    ' #filter.Alias#filter,' +
    ' #filter.Alias.filter', function () {
    var filter = new Alias();
    filterDataProvider().forEach(function (args) {
        var filteredValue = args[0].filtered,
            unfilteredValue = args[0].unfiltered;
        it(`should return slug ${filteredValue} when \`value\` is ${unfilteredValue}.`, function () {
            expect(filter.filter(unfilteredValue)).to.equal(filteredValue);
            expect(Alias.filter(unfilteredValue)).to.equal(filteredValue);
            expect(Alias(unfilteredValue)).to.equal(filteredValue);
        });
    });
});
