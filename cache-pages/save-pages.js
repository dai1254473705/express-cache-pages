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
                childOptions = childOptions instanceof Object ? childOptions : {};
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

                /**
                 * check mode and get url
                 * `strict`: Are there any "?" in the url ,the results are different.
                 *      127.0.0.1:3000/home/          ===> md5: 64741d61eee040c1fd68c7a41f1ca14c
                 *      127.0.0.1:3000/home/?name=123 ===> md5: 7b83c2cd7160f6cb962585ae026c66b1
                 * `greedy`: Are there any "?" in the url ,the results are same.
                 *      127.0.0.1:3000/home/          ===> md5: 64741d61eee040c1fd68c7a41f1ca14c
                 *      127.0.0.1:3000/home/?name=123 ===> md5: 64741d61eee040c1fd68c7a41f1ca14c
                 */
                let testUrl = '';
                let mode = childOptions.mode || cache.config.mode || '';
                switch(mode) {
                    case 'strict':
                        testUrl = Request.url;
                        break;
                    case 'greedy':
                        testUrl = Request.path;
                        break;
                    default:
                        testUrl = Request.url;
                }
                // test and add '/' to keep: '127.0.0.1:3000/home/' ==='127.0.0.1:3000/home'
                if (testUrl.lastIndexOf('/') !== testUrl.length-1) {
                    testUrl = `${testUrl}/`
                }

                // get md5 path
                const url = `${Request.headers.host}${testUrl}`;
                const md5Path = utils.md5(url);
                debug('%s','save md5url:',url);
                debug('%s','save md5:',md5Path);
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