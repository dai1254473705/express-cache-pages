/*!
 * init cache pages
 */
'use strict';

const cachePages = require('./cache-pages');
const path = require('path');

// 缓存规则
// route：为路由规则的正则表达式
// term：为缓存过期时间，单位秒
// validTimeStamp：为缓存开始生效的时间戳。如果涉及到模版修改等迭代升级，需要作废之前该分类下所有缓存，则传入一个晚于上线时间的时间戳即可
//     如果上线后需要将之前缓存失效，传入上线的时间 /1000   如： new Date().getTime() / 1000 取整后即可，不需要十分精确
// mode：模式
// load：{Boolean} 是否要读取缓存，false： 只存不读；

// mode参数：
// strict - 严格匹配，则不严格符合此规则的都忽略，不会走缓存（不带请求参数的链接）
// greedy - 贪婪匹配，则后面带有get参数的url同样会匹配到此规则，将 请求指向【不加get参数的页面的缓存】
// distinguishing - 特例匹配，则不带get参数的请求和带有get参数的请求将指向不同的页面（带请求参数或者没有请求参数的）
// 默认采用精准匹配strict模式

/**
 * 设：rule.route = '\/ask\/[^/\s]+\/[^/\s]+\.html';
 *
 * strict:
 *
 * 处理方法：
 *    reg = new RegExp('\/ask\/[^/\s]+\/[^/\s]+\.html' + '$');
 * 如：
 *    url1: http://www.zhuge1.com:3000/ask/bj/maifang1-22024.html
 *    url2: http://www.zhuge1.com:3000/ask/bj/maifang1-22024.html?sdf=sdf
 *
 *    reg.test(url1); // true  将被缓存，文件名如： md5(url1) cd07ec1f0feb0445a98b1653c8a47d62
 *    reg.test(url2); // false 将不被缓存
 * ------------------------------------------------------------------------------
 * greedy:
 *
 * 处理方法：
 *    reg = new RegExp('\/ask\/[^/\s]+\/[^/\s]+\.html');
 * 如：
 *    url1: http://www.zhuge1.com:3000/ask/bj/maifang1-22024.html
 *    url2: http://www.zhuge1.com:3000/ask/bj/maifang1-22024.html?sdf=sdf
 *
 *    reg.test(url1); // true  将被缓存，文件名如：md5(url1) cd07ec1f0feb0445a98b1653c8a47d62
 *    reg.test(url2); // true  将被缓存，文件名如：md5(url1) cd07ec1f0feb0445a98b1653c8a47d62
 * -------------------------------------------------------------------------------
 * distinguishing:
 *
 * 处理方法：
 *    reg = new RegExp('\/ask\/[^/\s]+\/[^/\s]+\.html');
 * 如：
 *    url1: http://www.zhuge1.com:3000/ask/bj/maifang1-22024.html
 *    url2: http://www.zhuge1.com:3000/ask/bj/maifang1-22024.html?sdf=sdf
 *
 *    reg.test(url1); // true  将被缓存，文件名如：md5(url1) cd07ec1f0feb0445a98b1653c8a47d62
 *    reg.test(url2); // true  将被缓存，文件名如：md5(url2) 11096f0267324443584496138ac2b576
 * -------------------------------------------------------------------------------
 */
const cachePagesInit = cachePages({
    safeMode: false,// 安全模式，一旦开启，不管缓存是否失效，都将走缓存机制
    global: true,// 是否全局开始缓存，静态化全局开关
    // sos: 'http://www.netyali.cn/?from=express-cache-pages',// 出现大范围攻击或者瘫痪后使用了缓存的路由将跳转到指定链接（redirect）503
    // path: path.join(__dirname, './../../..', 'wiicache'), // 保存缓存的目录
    path: path.join(__dirname, 'express_cache_pages'), // 保存缓存的目录
	cookiesBlackList: ['_uid'],// 黑名单，包含其中cookie的将不读取
    term: 10000,// 失效时间，如果设置0，永远不失效
    validTimeStamp: 0,// 开始生效的时间
    minLength: 100,// html最短长度
    mode: 'strict'
    // load: true,//是否需要读取，单个路由静态化开关
});

/**
 * Module exports
 */
module.exports = cachePagesInit;
