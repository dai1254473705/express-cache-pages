/*!
 * express-cache-pages
 * yunzhoudai 2019-08-14 20:14
 * Copyright(c) 2019 yunzhoudai
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */
const fse = require('fs-extra');
const path = require('path');
const debug = require('debug')('cache');
const loadPage = require('./load-page');
const savePage = require('./save-pages');
/**
 * Module variables.
 * @private
 */

/**
 * Initialize a new `Router` with the given `options`.
 *
 * @param {Object} [options]
 * @return {cache} which is an callable function
 * @public
 * 
 * @member { Object } runTime `run time control`
 * @member { Object } config `init config`
 * @member { Function }  
 * 
 */

function cachePages(options){
    debug('%O\n',options);
    // init Object
    const cache = new Object();

    // cache runtime
    cache.runTime = {
        startTime: 0,
        endTime:0,
        runingTime:0 
    };

    // use config
    cache.config = {
        'global': true,// level:1 Global Switch,set false will not load or save any files to disk;
        'safeMode': false,// level:2 safe mode,set true will load all cache file and including expired file
        'sos': '',//level:3 Cached routing will jump to specified links after a wide-scale attack or paralysis occurs
        'cookiesBlackList': [], // default value,if the page in browser had any cookie in cookiesBlackList array will not load cache file.
        'term': 0, // if set 0, the saved file will in used forever,unit is second(s): 10
        'validTimeStamp': 0, // Caching function start time
        'load': true, // default is true,only used when middleware in specific route.
        'path': '',// <requeired> the path to save cache files to disk.
        'minLength': 0,// can load file content min length.
    };

    /**
     * The load pages method.
     * @param { Object } Request `request of express`
     * @param { Object } [Response] `response of express`
     * @param { Function } [Next] `next of express`
     * @return null
     */
    cache.loadPage = loadPage(cache,options);

    /**
     * The save pages method.
     * @param { Object } cache `cache Object`
     * @param { Object } [Response] `response of express`
     * @param { Function } [Next] `next of express`
     * @return null
     */
    cache.savePage = savePage(cache,options);

    /**
     * return cache
     */
    return cache;
};

/**
 * Module exports
 */
module.exports = cachePages;