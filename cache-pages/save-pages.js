/*!
 * save-pages
 * yunzhoudai 2019-08-16 18:09
 * Copyright(c) 2019 yunzhoudai
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */
const cookieParse = require('cookie-parse');
const utils = require('./utils');
const debug = require('debug')('cache');
const checkTypes = require('./check-types');
const checkLoad = require('./check-load');
const loadFile = require('./load-file');
const fse = require('fs-extra');

function savePages (cache,options){
    return function (childOptions) {
        /**
         * The load pages method.
         * @param { Object } Request `request of express`
         * @param { Object } [Response] `response of express`
         * @param { Function } [Next] `next of express`
         * @return null
         */
        return function (Request,Response,Next){
            debug('%s','start step 5: save-page process...');
            try {
                // the html need to save
                let html = Request.html;

                // check options
                if (!checkTypes(cache, options)) {
                    return;
                }

                const cookies = cookieParse.parse(Request.headers.cookie);
                const cacheTag = Object.keys(cookies).some(function (element){
                    return cache.config.cookiesBlackList.includes(element);
                });
                if (cacheTag) {
                    Response.send(html);
                    return;
                }

                // filter min lenth content
                if (!html || html.length < cache.config.minLength) {
                    Response.send(html);
                    return;
                }

                // save

                // get md5 path
                const url = `${Request.headers.host}${Request.url}`;
                const md5Path = utils.md5(url);
                const fileDir = utils.fileDir(md5Path,cache.config.path);
                const fileDirPath = utils.fileDirPath(md5Path,cache.config.path);
                fse.ensureDir(fileDirPath,function (err){
                    if (err) {
                        debug('%s','create file dir to save file error!');
                        return;
                    }
                    const timeStamp = new Date().getTime();
                    html += '<!-- cache version : ' + timeStamp + ' -->';
                    // write file
                    fse.writeFile(fileDir, html, {}, function (err) {
                        if (err) {
                            debug('%s','write file error!');
                            return;
                        }
                    });
                })
                Response.send(html);
                return;
            } catch(error) {
                Next(error);
            }
        };
    }
}

/**Export */
module.exports = savePages;