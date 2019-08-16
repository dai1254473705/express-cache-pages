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
const checkTypes = require('./check-types');
const checkLoad = require('./check-load');
const loadPage = require('./load-page');
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
 */

function cachePages(options){
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
    };

    /**
     * check type
     * @return typeTag
     */
    cache.checkType = checkTypes(cache, options); 

    /**
     * Check whether the pages of html need to load;
     * @param { String } md5Path `md5 path`
     * @return [Boolean] need to load return true ,else return false;
     */
    cache.checkLoad =  checkLoad(cache);
    
    /**
     * get static page of file
     * @param { String } md5Path `md5 path`
     * @return file
     */
    cache.getFile = function (md5Path) {
        return '';
    };

    /**
     * The load pages method.
     * @param { Object } Request `request of express`
     * @param { Object } [Response] `response of express`
     * @param { Function } [Next] `next of express`
     * @return null
     */
    cache.loadPage = loadPage(cache);
    /**
     * return cache
     */
    return cache;
};

/**
 * Module exports
 */
module.exports = cachePages;