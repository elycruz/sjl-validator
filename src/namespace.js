/**
 * Created by elydelacruz on 3/25/16.
 */
(function () {
    if (typeof window === 'undefined') {
        var sjl = require('sjljs');
        module.exports = sjl.extend(sjl.ns, sjl.createTopLevelPackage({}, 'package', 'ns', __dirname).ns);
    }
    else {
        return window.sjl.ns;
    }
}());
