var express = require('express');
var app = express();
var fs = require('fs');

//about header
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
 
 app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



 app.post('/signUpAccount',function(req,res){
	 MongoClient.connect(url, function(err,db){
		 if(err) throw err;
		 var databaseObject = db.db("stark");
		 var userData = req.body;
		 databaseObject.collection("fh_user").insertOne(userData, function(err,res){
			 if(err) throw err;
			 console.log("ducument 1 inserted");
			 db.close();
		 });
		 
	});
		
	console.log(req.body);
 });
 
app.listen(2727);