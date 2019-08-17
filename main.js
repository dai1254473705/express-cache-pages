var express = require("express");
var morgan  = require("morgan");
var path 	= require('path');
var app     = express();
var router  = express.Router();
var ejs 	= require('ejs');
var cachePages = require('./init-cache-pages');

// view engine setup
app.engine('ejs', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

// main page
router.get('/home',
	cachePages.loadPage({ term: 5000, validTimeStamp: 0, load: true }), 
	function(req, res, next) {
		setTimeout(function(){
			res.render('index', {
				title: "title", 
				data: {
					name: 'express-cache-pages',
				}
			},function (err,html){
				req.html = html;
				next();
			});
		},1000)
	},
	cachePages.savePage({
		mode: 'strict'
	})
);

// 404 or other page
router.get('/sos', function(req, res, next) {
	res.render('index', {
		title: "service is bussiy",  
		data: {
			name: 'sos mode',
		}
	});
});

app.listen(3000,function(){
	console.log(`current runing port: 
		http:127.0.0.1:3000/`);
});
