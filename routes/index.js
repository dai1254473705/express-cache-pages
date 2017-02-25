var express = require('express');
var router  = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', {
		title: "小白金融",  
		amount: "63,554,087.10"
	});
});

module.exports = router;