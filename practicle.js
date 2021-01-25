var http = require('http');
var server = http.createServer(function(req,res){
console.log("server is created..!");
}).listen(3300);