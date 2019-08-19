/*!
 * load-file
 * yunzhoudai 2019-08-16 18:09
 * Copyright(c) 2019 yunzhoudai
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */
const debug = require('debug')('cache');
const fse = require('fs-extra');
const utils = require('./utils');
/**
 * get static page of file
 * @param { String } md5Path `md5 path`
 * @param { Object } childOptions `current route options`
 * @return file
 */
function loadFile(cache,md5Path) {
    try {
        debug('%s','start step 4: read-file process...');
        // get file path、
        const filePath = utils.fileDir(md5Path,cache.config.path);
        // read file
        const html = fse.readFileSync(filePath, 'utf-8');
        if (html && html.length > cache.config.minLength) {
            return html;
        }
        return false;
    } catch (error) {
        return false;
    }
}

/** Modele Exports */
module.exports = loadFile;
