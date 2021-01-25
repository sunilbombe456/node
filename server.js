var http = require('http');

var server = http.createServer(function(req,res){
	if(req.url == '/')
	{
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<html><body><p>this is home Page...</p></body></html>');
		res.end();
	}else if(req.url == "/student")
	{
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<html><body><p>this is Student  Page...</p></body></html>');
		res.end();
	}else if(req.url == '/admin')
	{
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<html><body><p>this is Admin Page...</p></body></html>');
		res.end();
	}else if(req.url == '/data')
	{
	 res.writeHead(200,{'Content-Type':'application/json'});
	 res.writeHead(200,{"Access-Control-Allow-Origin":"*"});
	 res.write('{"name" : "sunil", "id" : "14", "college" : "shree Datta Vidyalya"}');
	}else{
		res.end("Invalid request");
	}
});

server.listen(5000);

console.log('node js web-server at port 5000 started');