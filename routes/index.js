var express = require('express');
var router  = express.Router();

router.get('/*', function(req, res, next) {
	setTimeout(function(){
		res.render('index', {
			title: "title",  
			data: {
				name: 'express-cache-pages',
			}
		});
	},1000)
});

module.exports = router;