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
const fse = require('fs-extra');
const crypto = require('crypto');
const path = require('path');
const debug = require('debug')('cache');
const utils = require('./utils');
const cookieParse = require('cookie-parse');
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
    const MIMETYPE = ['application/json'];

    // cache runtime
    cache.runTime = {
        startTime: 0,
        endTime:0,
        runingTime:0 
    };

    // use config
    cache.config = {
        'cookiesBlackList': [], // default value
    };

    /**
     * check type
     * @return typeTag
     */
    cache.checkType = function(){
        // set start time
        cache.runTime.startTime =  new Date().getTime();

        // set tag
        let typeTag = true;

        // check cookiesBlackList
        if ( typeof options.cookiesBlackList !== 'undefined' ) {
            if ( options.cookiesBlackList instanceof Array ) {
                cache.config.cookiesBlackList = [].concat(options.cookiesBlackList);
            } else {
                typeTag = false;
                throw new Error('express-cache-pages:The cookiesBlackList must be an array!');
            }
        }

        // =========================timer control =======================
        cache.runTime.endTime  = new Date().getTime();
        const runTime = cache.runTime.startTime - cache.runTime.endTime;
        debug('%s','timer control line(check type):',runTime);
        // ==============================================================

        return typeTag;
    };

    /**
     * Check whether the pages of html need to load;
     * @param { String } md5Path `md5 path`
     * @return [Boolean] need to load return true ,else return false;
     */
    cache.checkLoad = function (cookies, md5Path,callback){
        try {
            // default is not to load
            let loadTag = false;

            // cookies blackList
            cookies = cookies || {};

            debug('%s',md5Path);
            debug('%%',cookies);
            console.log(cache.config);
            console.log(cache.config.cookiesBlackList);

            // if cacheTag is true,do not need to load cache
            const cacheTag = Object.keys(cookies).some(function (element){
                return cache.config.cookiesBlackList.includes(element);
            });
            loadTag = !cacheTag;
            callback && callback(null, loadTag);
        } catch (error) {
            callback && callback(error, false);
        }
    };
    
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
    cache.loadPage = function (Request,Response,Next){
        try {
            if (!cache.checkType()) {
                return;
            }
            // get md5 path
            const url = `${Request.headers.host}${Request.url}`;
            const md5Path = utils.md5(url);

            // cookie parse
            const cookies = cookieParse.parse(Request.headers.cookie);

            // debug('%s',url);
            // debug('%s',md5Path);
            // check load
            cache.checkLoad(cookies, md5Path, function (err, loadTag){

                // load check error
                if (err) { 
                    return Next(err);
                }

                debug('%s','neet to load page?:'+loadTag);

                // do not need to load the page.
                if ( !loadTag ) {
                    Next();
                    return;
                }

                // get the file which had saved;
                cache.getFile(md5Path, function (err,file){
                    // read file error
                    if (err) {
                        Next();
                        return;
                    }

                    Request.send(file);
                    return;
                });
            });
        } catch (error) {
            console.error(error);
            Next();
        }
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