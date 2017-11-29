/**
 * Created by elydelacruz on 3/25/16.
 */
(function () {

    let nodeEnv = typeof window === 'undefined',
        sjl,
        ns;

    // Get `sjl` and `sjl.ns`
    if (nodeEnv) {
        sjl = require('sjljs');
        ns = new sjl.nodejs.Namespace(__dirname);
    }
    else {
        sjl = window.sjl;
        ns = sjl.ns;
    }

    // Extend existing sjl namespaces
    sjl.extend(sjl.ns, ns);
    sjl.extend(sjl, ns);

    // Export sjl
    if (nodeEnv) {
        module.exports = sjl;
    }
    else if (window && window.__isAmd) {
        return window.sjl.ns;
    }

}());
