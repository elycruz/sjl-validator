/**
 * Created by elydelacruz on 3/25/16.
 */
describe(
    'sjl.filter.SlugFilter,' +
    'sjl.filter.SlugFilter#filter,' +
    'sjl.filter.SlugFilter.filter', function () {

        // ~~~ STRIP ~~~
        // This part gets stripped out when
        // generating browser version of test(s).
        'use strict';
        var chai = require('chai'),
            sjl = require('./../../src/sjl'),
            expect = chai.expect;
        // These variables get set at the top IIFE in the browser.
        // ~~~ /STRIP ~~~

        var SlugFilter = sjl.filter.SlugFilter;

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
                    'unfiltered': 'some" other" value',
                    'filtered': 'some-other-value'
                }],
                [{
                    'unfiltered': ' \\ \\ \\ \\ ',
                    'filtered': ''
                }],
                [{
                    'unfiltered': 'Not needing escape.',
                    'filtered': 'not-needing-escape'
                }],
                [{
                    'unfiltered': 'All your base are belong to us.',
                    'filtered': 'all-your-base-are-belong-to-us'
                }],
                [{
                    'unfiltered': ';All ;your ;base ;are ;belong ;to ;us.',
                    'filtered': 'all-your-base-are-belong-to-us'
                }]
            ];
        }

        //function invalidFilterCandidateProvider() {
        //    return [
        //        // Not of correct type for test:  Should throw exception
        //        [function () {
        //        }],
        //        // Not of correct type for test;  Should throw exception
        //        [true],
        //        // Not of correct type for test;  Should throw exception
        //        [99]
        //    ];
        //}

        var filter = new SlugFilter();
        filterDataProvider().forEach(function (args) {
            var filteredValue = args[0].filtered,
                unfilteredValue = args[0].unfiltered;
            it(`should return slug ${filteredValue} when \`value\` is ${unfilteredValue}.`, function () {
                expect(filter.filter(unfilteredValue)).to.equal(filteredValue);
                expect(SlugFilter.filter(unfilteredValue)).to.equal(filteredValue);
                expect(SlugFilter(unfilteredValue)).to.equal(filteredValue);
            });
        });

        //it ('should throw an error when attempting to filter unsupported values.', function () {
        //    invalidFilterCandidateProvider()[0].forEach(function (args) {
        //        return expect(SlugFilter(args[0])).to.throw(Error);
        //    });
        //});
    });
