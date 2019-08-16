/*!
 * check-load
 * yunzhoudai 2019-08-16 18:09
 * Copyright(c) 2019 yunzhoudai
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */
const debug = require('debug')('cache');

/**
 * cache object
 * @param { Object } cache 
 */
function checkLoad (cache) {
    /**
     * @param { Object } cookies `cookies object`
     * @param { String } md5Path `url md5`
     * @param { Object } updateOptions `current route options`
     * @param { Object } callback 
     */
    return function (cookies, redirect, md5Path,updateOptions,callback){
        try {
            // default is not to load
            let loadTag = false;

            // if global options is close, do not load any file.
            if (!cache.config.global) {
                return false;
            }

            // if safeMode options is open,to load all match file.
            if (cache.config.safeMode) {
                // if sos options is set, redirect to the sos url.
                if (cache.config.sos) {
                    debug('%s','sos redirect to:'+cache.config.sos);
                    // set 503 prevent seo to abandon keep that url.
                    redirect(503, cache.config.sos)
                    return;
                } else {
                    return true;
                }
            }

            // cookies blackList
            // if cacheTag is true,do not need to load cache
            cookies = cookies || {};
            const cacheTag = Object.keys(cookies).some(function (element){
                return cache.config.cookiesBlackList.includes(element);
            });
            loadTag = !cacheTag;

            // test route

            callback && callback(null, loadTag);
        } catch (error) {
            callback && callback(error, false);
        }
    }
};

module.exports = checkLoad;