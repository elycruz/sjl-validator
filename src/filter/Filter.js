import {assignDeep} from 'fjl';

class Filter {
    constructor (options) {
        assignDeep(this, options);
    }

    filter (value) {
        throw new Error ('function should be overridden from extending class');
    }
}
