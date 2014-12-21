'use strict';

var flagKey = '__EV_STORE_ENFORCE_SINGLETON';
var MY_VERSION = '6';
var globalScope = getGlobalScope();

if (globalScope[flagKey]) {
    var version = globalScope[flagKey];
    throw new Error('Can only have one copy of ev-store.\n' +
        'You already have version ' + version + ' installed.\n' +
        'This means you cannot install version ' + MY_VERSION);
}

globalScope[flagKey] = MY_VERSION;

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

function getGlobalScope() {
    return typeof global !== 'undefined' ? global :
        typeof window !== 'undefined' ? window : {};
}
