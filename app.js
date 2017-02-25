var express = require("express");
var morgan  = require("morgan");
var path 	= require('path');
var app     = express();
var favicon = require('serve-favicon');
var ejs 	= require('ejs');

//app.get("/",function(req,res){
//	res.send("hello world");
//});

var index = require('./routes/index');

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));
//主页
app.use('/', index);
app.use(function(req, res) {
//	console.log(req.res)
	res.end(req.url)
})
var server = app.listen(9010);
module.exports = app;
