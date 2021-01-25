const morgan = require('morgan');
const express = require("express");
const helmet = require('helmet');
//for validation handling 
const Joi = require('joi');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
//for mysql database
var mysql = require('mysql');

var connection = mysql.createPool({
	//properties
	connectionLimit : 50,
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'food'
});
 
//end mysql database connection


// for express js framework
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('shared'));
app.use(helmet());


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
 
 app.use(express.json());

// for post request
 

//common use data
const courses =[
{id:1,name:"computer science"},
{id:2,name:"computer network"},
{id:3,name:"computer hardware"}
];


//common function 

// function courseValidation( course ){
// 	const schema = {
// 		name:Joi.string().min(3).required()
// 	};
// 	return Joi.validate(course,schema);
// };


//for request porpose
// if(app.get('env')=== 'development'){
// 	app.use(morgan('tiny'));
// 	console.log('Morgan enabled....');
// }


// app.get("/api/courses", (req,res) => {
// 	res.send(courses)
// })

// to create user account
// to admin login

app.post('/signInAdminAccount', function(req,res){
	MongoClient.connect(url, function(err, db){
		if(err) throw err;
		var databaseObject = db.db("stark");
		databaseObject.collection("fh_admin").find({ ad_username: req.body.ad_username, ad_pwd: req.body.ad_pwd }).toArray(function(err,result){
			if(err) throw err;
			console.log(result);
			res.send(result);
			db.close();
		});
 	});
});

app.post('/signUpRest', function(req, res){
	MongoClient.connect(url, function(err, db){
		if(err) throw err;
		var databaseObject = db.db("stark");
		databaseObject.collection("fh_restaurant").insertOne(req.body, function(err,res){
			if(err) throw err;
			console.log("document one inserted");
			db.close();
		})
	});
});

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

// create rest

// end rest

app.post('/signInAccount', function(req,res){
	MongoClient.connect(url, function(err, db){
		if(err) throw err;
		var databaseObject = db.db("stark");
		databaseObject.collection("fh_user").find({ UserEmail: req.body.UserEmail, UserPwd: req.body.UserPwd}).toArray(function(err,result){
			if(err) throw err;
			console.log(result);
			res.send(result);
			db.close();
		});
 	});
});

app.get('/allAccount', function(req,res){
	MongoClient.connect(url, function(err, db){
		if(err) throw err;
		var databaseObject = db.db("stark");
		databaseObject.collection("fh_user").find({}).toArray(function(err,result){
			if(err) throw err;
			console.log(result);
			res.send(result);
			db.close();
		});
 	});
});

//mysql data query start
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
 
//mysql data query ends
//for the dynamic port

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Listening on port ${port} ...`)});
