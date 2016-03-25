/**
 * Created by elydelacruz on 3/25/16.
 */
'use strict';

let expect = require('chai').expect,
    sjl = require('sjljs'),
    Alias = require('../src/filter/Alias'),
    Slug = require('../src/filter/Slug');

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
        // To short for test:  Should throw exception
        [''],
        // To long for test;  Should throw exception
        [str_repeat('A', 201)],
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
});

describe(
    '#filter.Alias,' +
    ' #filter.Alias#filter,' +
    ' #filter.Alias.filter', function () {
    var filter = new Alias();
        console.log(Alias);
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
