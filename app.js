var express = require("express");
var morgan  = require("morgan");
var path 	= require('path');
var app     = express();
var ejs 	= require('ejs');

//app.get("/",function(req,res){
//	res.send("hello world");
//});

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(morgan("dev"));

//主页
app.use('/', index);

var server = app.listen(3000,function(){
	console.log("http://127.0.0.1:3000");
});
module.exports = app;