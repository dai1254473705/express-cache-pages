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
                if (!checkTypes(cache, options)) {
                    return;
                }
                // get md5 path
                const url = `${Request.headers.host}${Request.url}`;
                const md5Path = utils.md5(url);

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
                console.error(error);
                Next();
            } finally {
                debug('%s','start step 1: load-page process end');
            }
        };
    };
};
module.exports = loadPage;