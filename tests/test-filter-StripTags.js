/**
 * Created by Ely on 3/30/2016.
 */
'use strict';

let expect = require('chai').expect,
    ns = require('../src/namespace'),
    StripTags = ns.filter.StripTags;

describe('#filter.StripTags', function () {
    it ('should be an instance of StripTags constructor.', function () {
        expect(new StripTags()).to.be.instanceOf(StripTags);
    });

    describe('#filter.StripTags.filter', function () {
        console.log(
            StripTags.filter(
                '<html lang="eng">Hello World</html>' +
                '<head>Hello</head>', ['html', 'head'], ['lang']));
    });

});
