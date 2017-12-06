/**
 * Created by elydelacruz on 3/25/16.
 */
import {errorIfNotType$} from 'fjl-error-throwing';
import {defineEnumProps$} from 'fjl-mutable';
import {assign} from 'fjl';

// Xml names and tokens
// Valid html tag and attribute names and
// @see https://www.w3.org/TR/xml/#sec-terminology
// @see https://www.w3.org/TR/xml/#NT-Name
const

    contextName = 'StripTagsFilter',

    nameStartCharPartial = [
        '\\:_a-z',
        '\\xC0-\\xD6',
        '\\xD8-\\xF6',
        '\\xF8-\\x2FF',
        '\\x370-\\x37D',
        '\\x37F-\\x1FFF',
        '\\x200C-\\x200D',
        '\\x2070-\\x218F',
        '\\x2C00-\\x2FEF',
        '\\x3001-\\xD7FF',
        '\\xF900-\\xFDCF',
        '\\xFDF0-\\xFFFD',
        '\\x10000-\\xEFFFF'
    ].join(''),

    nameCharPartial = nameStartCharPartial.concat([
        '\\-\\.\\d\\xB7',
        '\\x0300-\\x036F',
        '\\x203F-\\x2040'
    ]).join(''),

    namePartial = `[${nameStartCharPartial}][${nameCharPartial}]*`,

    eqPartial = '\\s?\\=\\s?',

    mlnSpacePartial = '[\\n\\r\\t\\s]*', // our own

    attrValuePartial = '\\"[^\\"]*\\"',

    attrPartial = `${namePartial + eqPartial + attrValuePartial}`,

    tagNameRegex = new RegExp(`^${namePartial}$`, 'i'),

    validateName = tag => tagNameRegex.test(tag),

    validateNames = tags => tags.every(validateName),

    stripComments = value => value.replace(/<!--[\t\n\r]*.+[\t\n\r]*-->/gm, ''),

    createTagRegexPartial = tag =>
        `(<(${tag})(?:${mlnSpacePartial + attrPartial})*${mlnSpacePartial}>)` +
        `.*(<\/${mlnSpacePartial}\\2${mlnSpacePartial}>)`,

    stripTags = (value, tags) => {
        const localContextName = contextName + '.stripTags';
        errorIfNotType$(String, localContextName, 'value', value);
        errorIfNotType$(Array, localContextName, 'tags', tags);
        if (!validateNames(tags)) {
            throw new Error(`Type Error: ${localContextName} expects tag names passed in ` +
                `to conform to html tag/element name format.  Please review passed in tags`);
        }
        return tags.reduce((out, tag) => {
            let regex = new RegExp(createTagRegexPartial(tag), 'gim');
            return out.replace(regex, '');
        }, value);
    },


    stripAttribs = (value, attribs) => {
        if (!validateAttribs(attribs)) {
            throw new Error ('Attribs mismatch');
        }
        let out = value;
        attribs.forEach(function (attrib) {
            let regex = new RegExp(
                        '([\\n\\r\\t\\s]*' + attrib + '=\\"[^\\"]*\\")',
                    'gim'
                );
            out = out.replace(regex, '');
        });
        return out;
    },

    filter = (value, tags, attribs, removeComments) => {
        let out = stripTags(removeComments ? stripComments(value) : value, tags, attribs);
        return sjl.isEmptyOrNotOfType(attribs, Array) ? out :
            stripAttribs(out, attribs);
    }

;


export class StripTagsFilter {
    constructor (options) {
        defineEnumProps$([
            [Array, 'tags', []],
            [Boolean, 'stripComments', false],
            [Array, 'attribs', []]
        ], this);
        if (options) {
            assign(this, options);
        }
    }

    filter (value) {
        return StripTagsFilter.filter(
            value,
            this.tags,
            this.attribs,
            this.stripComments
        );
    }
}

Object.defineProperties(StripTagsFilter, {
    filter: {value: filter, enumerable: true}
});

export default StripTagsFilter;
