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
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const debug = require('debug')('cache');
const utils = require('./utils');
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

    // private variables

    // extends methods
    /**
     * @param { String } [url] `request url`
     */
    cache.checkUrl = function (url){
        console.log(url);
        debug('%s',url);
    };

    /**
     * load pages
     */
    cache.loadPage = function (Request,Response,Next){
        const url = `${Request.headers.host}${Request.url}`;
        debug('%s',url)
        Next();
    };
    /**
     * return cache
     */
    return cache;
};

/**
 * Module exports
 */
module.exports = cachePages;