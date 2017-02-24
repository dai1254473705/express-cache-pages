const express = require("express");
const app     = express();

app.get("/",function(req,res){
	res.send("hello world");
})

const server = app.listen(3000,function(){
	const host = server.address().address;
	const port = server.address().port;
	console.log(host);
	console.log(port);
	console.log("http://127.0.0.1:3000");
});
