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

function loadPage (cache){
    return function (options) {
        // reset default options from each item
        const updateOptions = {
            term:  options.term,
            validTimeStamp: options.validTimeStamp,
            load: options.load
        };
        
        return function (Request,Response,Next){
            try {
                if (!cache.checkType) {
                    return;
                }
                // get md5 path
                const url = `${Request.headers.host}${Request.url}`;
                const md5Path = utils.md5(url);

                // cookie parse
                const cookies = cookieParse.parse(Request.headers.cookie);
                const redirect = Response.redirect;
                // debug('%s',url);
                // debug('%s',md5Path);
                // check load
                cache.checkLoad(cookies,redirect, md5Path,updateOptions, function (err, loadTag){

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
    };
};
module.exports = loadPage;