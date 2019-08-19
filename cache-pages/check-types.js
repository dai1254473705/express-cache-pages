/*!
 * check-types
 * yunzhoudai 2019-08-16 18:08
 * Copyright(c) 2019 yunzhoudai
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */
const debug = require('debug')('cache');

function checkTypes (cache, options){
    debug('%s','start step 2: check-types process...');
    // set start time
    cache.runTime.startTime =  new Date().getTime();

    // set tag
    let typeTag = true;

    // check safeMode
    if (typeof options.safeMode === 'boolean') {
        cache.config.safeMode = options.safeMode;
    }
    
    // check global
    if (typeof options.global === 'boolean') {
        cache.config.global = options.global;
    }

    // check sos
    if (typeof options.sos === 'string') {
        cache.config.sos = options.sos;
    }
    
    // check cookiesBlackList
    if ( typeof options.cookiesBlackList !== 'undefined' ) {
        if ( options.cookiesBlackList instanceof Array ) {
            cache.config.cookiesBlackList = [].concat(options.cookiesBlackList);
        } else {
            typeTag = false;
            throw new Error('express-cache-pages:The cookiesBlackList must be an array!');
        }
    }
    
    // check minLength
    if (typeof options.minLength === 'number') {
        cache.config.minLength = options.minLength;
    }

    // check mode
    if (typeof options.mode === 'string') {
        cache.config.mode = options.mode || 'strict'; 
    }

    // check term
    if (typeof options.term === 'number') {
        cache.config.term = options.term;
    }

    // check validTimeStamp
    if (typeof options.validTimeStamp === 'number') {
        cache.config.validTimeStamp = options.validTimeStamp;
    }

    // check load
    if (typeof options.load === 'boolean') {
        cache.config.load = options.load;
    }

    // check path
    if (typeof options.path === 'string' && options.path !== '') {
        cache.config.path = options.path;
    } else {
        throw new Error('express-cache-pages:The path must be an string!');
    }

    // =========================timer control =======================
    cache.runTime.endTime  = new Date().getTime();
    const runTime = cache.runTime.startTime - cache.runTime.endTime;
    debug('%s%s','-------timer control line(check type)-----------:',runTime);
    // ==============================================================
    debug('%O',cache.config);

    return typeTag;
};

/**
 * Module exports
 */
module.exports = checkTypes;