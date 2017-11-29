/**
 * Created by elydelacruz on 10/9/16.
 */
(function () {

    "use strict";

    let Url,
        isNodeJs = typeof window === 'undefined',
        Constructors,
        Constructor;

    function setUrlObjProperties (context) {
        let _href;

        Object.defineProperties(context, {
            href: {
                get: function () {
                    return _href;
                },
                set: function (value) {
                    _href = value;
                },
                enumerable: true
            },
            protocol: {
                get: function () {
                    return _protocol;
                },
                set: function (value) {
                    _protocol = value;
                },
                enumerable: true
            },
            hostname: {
                get: function () {
                    return _hostname;
                },
                set: function (value) {
                    _hostname = value;
                },
                enumerable: true
            },
            port: {
                get: function () {
                    return _port;
                },
                set: function (value) {
                    _port = value;
                },
                enumerable: true
            },
            pathname: {
                get: function () {
                    return _pathname;
                },
                set: function (value) {
                    _pathname = value;
                },
                enumerable: true
            },
            search: {
                get: function () {
                    return _search;
                },
                set: function (value) {
                    _search = value;
                },
                enumerable: true
            },
            hash: {
                get: function () {
                    return _hash;
                },
                set: function (value) {
                    _hash = value;
                },
                enumerable: true
            },
            username: {
                get: function () {
                    return _username;
                },
                set: function (value) {
                    _username = value;
                },
                enumerable: true
            },
            origin: {
                get: function () {
                    return _origin;
                },
                set: function (value) {
                    _origin = value;
                },
                enumerable: true
            }
        });

    }


    if (!isNodeJs) {

        Constructors = ['URL', 'webkitURL'].filter(function (ConstructorName) {
            try {
                new window[ConstructorName]('/', 'http://www.yahoo.com');
            }
            catch (e) {
                return false;
            }
            return true;
        });

        if (Constructors.length > 0) {
            Constructor = Constructors.shift();
        }
        else {
            Constructor = function Url() {
                setUrlObjProperties(this);
            };
        }

    }


}());
