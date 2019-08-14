var express = require("express");
var morgan  = require("morgan");
var path 	= require('path');
var app     = express();
var ejs 	= require('ejs');

var index = require('./routes/index');

// view engine setup
app.engine('ejs', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));

//主页
app.use('/', index);
app.use(function(req, res) {
	res.end(req.url)
})
app.listen(3000,function(){
	console.log(`current runing port: 
		http:127.0.0.1:3000/`);
});
