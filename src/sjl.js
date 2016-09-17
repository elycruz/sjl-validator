/**
 * Created by elydelacruz on 3/25/16.
 */
(function () {

    if (typeof window === 'undefined') {
        module.exports = function (sjl) {
            var sjl = sjl || require('sjljs'),
                ns = new sjl.nodejs.Namespace(__dirname);
            sjl.extend(sjl.ns, ns);
            sjl.extend(sjl, ns);
            return sjl;
        };
    }

    // If is amd return self
    if (window.__isAmd) {
        return window.sjl.ns;
    }

}());
