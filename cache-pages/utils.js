/*!
 * util
 * yunzhoudai 2019-08-14 20:14
 * Copyright(c) 2019 yunzhoudai
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @api private
 */
const crypto = require('crypto');
const path = require('path');
const fse = require('fs-extra');

function utils (){
    /**
     * Module variables.
     * @private
     */
    const DefaultInfo = {
        moduleName: 'express-cache-pages',
        version: '0.0.1'
    };

    /**
     * @private
     */
    const obj = Object.create(DefaultInfo);

    /**
     * md5 encrypted
     * @param { Any } text
     * @return { String } 32 bit length encrypted string
     * @private
     */
    obj.md5 = function (text){
        return crypto.createHash('md5').update(text).digest('hex');
    };

    /**
     * generate file dir
     * @private
     */
    obj.fileDir = function (md5Path,rootDir){
        const fileName = md5Path;
        const fileFirst = fileName.substr(0, 2);
        const fileSecond = fileName.substr(2, 2);
        const filePath = path.join(rootDir,fileFirst ,fileSecond ,fileName);
        return filePath;
    };

    obj.fileDirPath = function (md5Path,rootDir){
        const fileName = md5Path;
        const fileFirst = fileName.substr(0, 2);
        const fileSecond = fileName.substr(2, 2);
        const filePath = path.join(rootDir,fileFirst ,fileSecond);
        return filePath;
    };
    return obj;
};

module.exports = utils();
