/*!
 * express-cache-pages
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
     * Module variables.
     * @private
     */
    return obj;
};

module.exports = utils();
