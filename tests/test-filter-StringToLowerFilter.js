/**
 * Created by elydelacruz on 3/25/16.
 */
'use strict';

let expect = require('chai').expect,
    ns = require('../src/namespace'),
    StringToLowerFilter = ns.filter.StringToLowerFilter;

function filterDataProvider() {
    return [
        [{
            'unfiltered': 'Hello.  What is your name?',
            'filtered': 'hello.  what is your name?'
        }],
        [{
            'unfiltered': 'Thrice as nice!',
            'filtered': 'thrice as nice!'
        }],
        [{
            'unfiltered': 'hello%world',
            'filtered': 'hello%world'
        }],
        [{
            'unfiltered': 'unaffected-value',
            'filtered': 'unaffected-value'
        }],
        [{
            'unfiltered': "some' other' value",
            'filtered': "some' other' value"
        }],
        [{
            'unfiltered': " \\ \\ \\ \\ ",
            'filtered': " \\ \\ \\ \\ "
        }],
        [{
            'unfiltered': "All your base are belong to us.",
            'filtered': "all your base are belong to us."
        }],
        [{
            'unfiltered': ";All ;your ;base ;are ;belong ;to ;us.",
            'filtered': ";all ;your ;base ;are ;belong ;to ;us."
        }]
    ];
}

describe(
    '#filter.StringToLowerFilter,' +
    ' #filter.StringToLowerFilter#filter,' +
    ' #filter.StringToLowerFilter.filter', function () {
    var filter = new StringToLowerFilter();
    filterDataProvider().forEach(function (args) {
        var filteredValue = args[0].filtered,
            unfilteredValue = args[0].unfiltered;
        it(`should return slug ${filteredValue} when \`value\` is ${unfilteredValue}.`, function () {
            expect(filter.filter(unfilteredValue)).to.equal(filteredValue);
            expect(StringToLowerFilter.filter(unfilteredValue)).to.equal(filteredValue);
            expect(StringToLowerFilter(unfilteredValue)).to.equal(filteredValue);
        });
    });

});
