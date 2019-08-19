# express-cache-pages
The middleware for express to cache dynamic pages to disk.
使用express 框架的中间件将动态模板文件保存成静态文件到磁盘；

demo:https://github.com/dai1254473705/express-cache-pages-demo
---

## Installation

```
npm install express-cache-pages --save
```

## Usage

> the middleware only `cachePages、loadPage、savePage` three method to use.

1. cachePages
+ `init-cache-pages.js`
```sh
const cachePagesInit = cachePages({
    safeMode: false,
    global: true,
    sos: '',
    path: path.join(__dirname, 'express_cache_pages'),
	cookiesBlackList: ['_uid'],
    term: 5000,
    validTimeStamp: 1566188063588,
    minLength: 100,
    mode: 'greedy'
});
module.exports = cachePagesInit;
```
2. loadPage && savePage

loadPage can set `term、validTimeStamp、load、mode` to reset `cachePages` options.
savePage can set `mode` to reset `cachePages` options.

you must to use callback in  `res.render` so that you can get `html` to do others thing.
+ add `html` proterty to `req`.
```sh
    req.html = html;
    next();
```

```sh
router.get('/home',
	cachePages.loadPage({ 
		term: 5000, 
		validTimeStamp: 0, 
		load: true,
		mode: 'strict'
	}), 
	function(req, res, next) {
		res.render('index', {
			title: "title", 
			data: {
				name: 'express-cache-pages',
			}
		},function (err,html){
			req.html = html;
			next();
		});
	},
	cachePages.savePage({
		mode: 'strict'
	})
);
```

## Doc
**`safeMode(安全模式)`: required（必须）**
 + type: `boolean`（可以设置为true或者false）
 + desc: If the `safeMode` is set to `true`, the expiration of the cache file is ignored when loading it.(如果把safeMode设置为true,则将忽略要读取的缓存的文件是否过期失效)

**`global（全局缓存开关）`: required（必须）**
 + type: `boolean` （可以设置为true或者false）
 + desc: If the `global` is set to `false`, the `express-cache-pages` modules will not work.(global属性设置为false，缓存模块将会失效，不开启静态化功能，静态化开关)

**`sos（紧急跳转链接）`：not required (非必须)**
 + type: `string`
 + desc: if the application had something wrong, you can set `sos` and `safeMode`:`true` and `global`:`true` the three options，the route which had used the `express-cache-pages` middleware will redirect to the sos options had setted url(use express res.redirect(503,sos)) (如果发生了紧急情况，可以同时设置`sos`、`safeMode`:`true`、'global':`true`这三个属性，使用了`express-cache-pages`的路由将会通过express提供的redirect方法503重定向到`sos`属性设置的目标链接。)

**`path`:required（必须）**
 + type: `string`
 + desc: the path where you want to save the cache files to disk.(将生成的静态文件保存到服务器磁盘的路径)

**`cookiesBlackList`: not required(非必须)**
 + type: `array`
 + desc: if the current html opend in brower had cookie in the `cookiesBlackList`, will not read or save the cache files.(如果当前在浏览器打开的页面中含有cookie黑名单中的值，将不会保存或者读取当前页面对应的缓存文件)

**`term`:required（必须）**
 + type: `number`
 + desc: if set 0, the saved file will in used forever,unit is second(s): 10(缓存文件的有效期，如果设置为0，将永久有效，单位为秒（s）)

**`validTimeStamp`:required（必须）**
 + type: `number` `example: new Date().getTime()`
 + desc: Caching function start time,you can update it to a future time if you update your code to server and had some chage with you pages.(开始缓存开始的时间，如果你更新了缓存页面的代码，上线后需要更新缓存文件，需要将此参数设置为未来的一个时间，当上线后再次读取文件时将会从你设置的时间之后开始读取)

**`minLength`:required(必须)**
 + type: `number`
 + desc: the save content min length.(需要保存文件内容长度的最小值，小于该值长度的内容将不被保存)

**`mode`:require(必须)**
 + type: `string` 'strict' || 'greedy'
 + desc: `strict` mode will use current express method of `request.url` to do md5. `greedy` mode will use `request.path` to do md5. Two mode will to add '/' to last if the url not have the '/' tag to close url.
 + example:
    **`strict`**: Are there any "?" in the url ,the results are different.
    `127.0.0.1:3000/home/          ===> filename: 64741d61eee040c1fd68c7a41f1ca14c`
    `127.0.0.1:3000/home/?name=123 ===> filename: 7b83c2cd7160f6cb962585ae026c66b1`

    **`greedy`**: Are there any "?" in the url ,the results are same.
    `127.0.0.1:3000/home/          ===> filename: 64741d61eee040c1fd68c7a41f1ca14c`
    `127.0.0.1:3000/home/?name=123 ===> filename: 64741d61eee040c1fd68c7a41f1ca14c`

## License

MIT
(The MIT License)

Copyright (c) 2019 yunzhoudai <1254473705@qq.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



