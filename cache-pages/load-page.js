/*!
 * load-page
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

function loadPage (cache, options){
    return function (childOptions) {
        /**
         * The load pages method.
         * @param { Object } Request `request of express`
         * @param { Object } [Response] `response of express`
         * @param { Function } [Next] `next of express`
         * @return null
         */
        return function (Request,Response,Next){
            debug('%s','start step 1: load-page process...');
            try {
                childOptions = childOptions instanceof Object ? childOptions : {};
                if (!checkTypes(cache, options)) {
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

                debug('%s','load md5Path',url);
                debug('%s','load md5:',md5Path);
                // cookie parse
                const cookies = cookieParse.parse(Request.headers.cookie);
                // check load
                checkLoad(cache, cookies, md5Path,childOptions, function (err, loadTag){
                    // load check error
                    if (err) {
                        switch(err.message) {
                            case 'sos':
                                // set 503 prevent seo to abandon keep that url.
                                Response.redirect(503, cache.config.sos);
                                return;
                            default:
                                return Next(err);
                        }
                    }

                    debug('%s','neet to load page?:'+loadTag);

                    // do not need to load the page.
                    if ( !loadTag ) {
                        Next();
                        return;
                    }

                    // load html file
                    const html = loadFile(cache,md5Path);
                    if (html) {
                        Response.send(html);
                    } else {
                        Next();
                        return;
                    }
                });
            } catch (error) {
                Next(error);
            } finally {
                debug('%s','start step 1: load-page process end');
            }
        };
    };
};
module.exports = loadPage;