var express = require('express');
var mysql = require('mysql');

var app = express();

var fs = require('fs');


/*
var connection = mysql.createConnection({
	//properties
	'host' : 'localhost',
	'user' : 'root',
	'password' : '',
	'database' : 'stark'
});
 */
 
 //same code use for connection pool
 
 var connection = mysql.createPool({
	//properties
	connectionLimit : 50,
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'food'
});
 
 // if we use create pool method to access the data then we dont need the connection.connect.....
 /*
 connection.connect(function(error)
 {
	 if(!! error)
	 {
		 console.log("error to connect");
	 }else{
		 console.log("connected to database");
	 }
 });
 */
 /*
 app.get('/',function(req,res){
	 connection.query("SELECT * FROM registration", function(error, rows, field){
		 if(!!error){
			 console.log("Error in Query");
		 }else{
			 console.log("query success");
			  res.contentType("application/json");
			 res.json(rows);
		 }
	 });
	
 });
 
 */
/*app.use(function(req,res,next){
	 res.header('Access-Control-Allow-Origin','*');
	   res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept' );
	    res.header('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, DELETE');
  }); */
 //app.use(express.json());
 
 
 app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
 
 app.use(express.json());
 
 app.get('/data', function(req,res){
	 connection.getConnection( function(error, tempCont){
		 if(!!error){
			 tempCont.release();
			 console.log(error);
		 }else{
			 tempCont.query("SELECT * FROM c_user", function(error, rows, field){
				  tempCont.release();
				  if(!!error){
					 console.log("error in query");
				 } else{
					 res.header("Content-Type", "application/json");
					 res.send(rows);
				 }
			 });
		 }
	 });
 });
 
 //to get restaurant data
 app.get('/restaurant',function(req,res){
	 connection.getConnection(function(error,tempCont){
		 if(!!error){
			 tempCont.release();
		 }else{
			 tempCont.query("SELECT * FROM rest_user", function(error, rows, field){
				 tempCont.release();
				 if(!!error){
					 console.log("error in query");
				 }else{
					 res.header("Content-Type", "application/json");
					 res.send(rows);
				 }
			 });
		 }
	 });
 });
 //post request
  app.post('/signUpAccount',function(req,res){
	console.log(req.body);
 });
 
 
 //to get rest details
 app.get('/restDetails',function(req,res){
	 connection.getConnection(function(error,tempCont){
		 if(!!error){
			 tempCont.release();
		 }else{
			 tempCont.query("SELECT * FROM rest_details", function(error, rows, field){
				 tempCont.release();
				 if(!!error){
					 console.log("error in query");
				 }else{
					 res.header("Content-Type", "application/json");
					 res.send(rows);
				 }
			 });
		 }
	 });
 });
 
 //to get rest dashboard
 app.get('/restDashBoard/:rest_id',function(req,res){
	  connection.getConnection( function(error, tempCont){
		 if(!!error){
			 tempCont.release();
			 console.log(error);
		 }else{
			 
			 tempCont.query("SELECT * FROM rest_details WHERE rest_id='"+req.params.rest_id+"'", function(error, rows, field){
				  tempCont.release();
				  if(!!error){
					 console.log("error in query");
				 } else{
					 res.header("Content-Type", "application/json");
					 res.send(rows);
				 }
			 });
		 }
	 }); 
 });
  
  //to get rest dish
  
  app.get('/restDish/:rest_id',function(req,res){
	  connection.getConnection( function(error, tempCont){
		 if(!!error){
			 tempCont.release();
			 console.log(error);
		 }else{
			 
			 tempCont.query("SELECT * FROM rest_dishes WHERE rest_id='"+req.params.rest_id+"'", function(error, rows, field){
				  tempCont.release();
				  if(!!error){
					 console.log("error in query");
				 } else{
					 res.header("Content-Type", "application/json");
					 res.send(rows);
				 }
			 });
		 }
	 }); 
 });
 
 //how to read json file
  app.get('/user',function(req,res){
	  fs.readFile("shared/account.json", function(err,data){
		  if(err){
			  console.log(err);
		  }else{
			  console.log(data);
			  res.send(data);
		  }
		 
  });
	
	 fs.appendFile('account.json','{"user_id":4, "name":"ganesh bombe", "username":"ganeshbombe456@gmail.com", "password":"ganesh", "mobile":"8605587543"}', function (err) { 
                        if (err)
        console.log(err);
                        else
        console.log('Append operation complete.');
	  });
  
  });
 //end json
 
 app.listen(3737);
 