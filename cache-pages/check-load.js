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
const utils = require('./utils');
const fse = require('fs-extra');

/**
 * Check whether the pages of html need to load;
 * @param { String } md5Path `md5 path`
 * @param { Object } cookies `cookies object`
 * @param { String } md5Path `url md5`
 * @param { Object } updateOptions `current route options`
 * @param { Object } callback [err<Object>,tag<Boolean>]
 */
function checkLoad (cache, cookies, md5Path,childOptions,callback){
    try {
        debug('%s','start step 3: check-load process...');

        // if global options is close, do not load any file.
        if (!cache.config.global) {
            callback(null,false);
            return;
        }

        // if safeMode options is open,to load all match file.
        if (cache.config.safeMode) {
            // if sos options is set, redirect to the sos url.
            if (cache.config.sos) {
                debug('%s','sos redirect to:'+cache.config.sos);
                callback(new Error('sos'),null);
                return;
            } else {
                callback(null,true);
                return;
            }
        }

        const isLoad = typeof childOptions.load === 'boolean' ? childOptions.load : true;
        // not load.
        if (!isLoad) {
            callback(null, false);
            return;
        }

        // cookies blackList
        // if cacheTag is true,do not need to load cache
        cookies = cookies || {};
        const cacheTag = Object.keys(cookies).some(function (element){
            return cache.config.cookiesBlackList.includes(element);
        });
        // had blackList
        if (cacheTag){
            callback(null, false);
            return;
        }
        
        // check file status
        const filePath = utils.fileDir(md5Path,cache.config.path);
        const fileDisk = fse.pathExistsSync(filePath);
        // file does not exist 
        if (!fileDisk) {
            callback(null, false);
            return;
        }

        // get file status.
        const stat = fse.statSync(filePath);
        // the file last modify timeStamp.
        const fileTimeStamp = Date.parse(new Date(stat.mtime));
        // check child options.
        const validTimeStamp = childOptions.validTimeStamp || cache.config.validTimeStamp || 0;
        // if the file last modify time is early than the validTimeStamp of init options what you set will not load.
        if (fileTimeStamp < validTimeStamp) {
            callback(null, false);
            return;
        }

        const term = childOptions.term || cache.config.term || 0;

        // if term is false, never Expires
        if (!term) {
            callback(null, true);
            return;
        } else {
            // file is Invalid.
            if (new Date().getTime() - fileTimeStamp > term) {
                callback(null, false);
                return;
            }
        }
        callback(null, true);
    } catch (error) {
        callback && callback(error, false);
    } finally {
        debug('%s','start step 3: check-load process end');
    }
};

module.exports = checkLoad;