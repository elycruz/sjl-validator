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
                '<html lang="eng" lang="chinese" mambo="no.3">' +
                '<head mambo="no.9" mambo="hello" mambo="what is your name?">Hello</head>Hello World' +
                '<head>Hello</head><!-- This is a comment.  Hello World x2. -->Hello World' +
                '<head style="display: inline-block;">Hello</head>Hello World' +
                '<head>Hello<p>Carlos Patatos</p></head>Hello World' +
                '</html>', ['p'], ['lang', 'style', 'mambo'], true));
    });

});
