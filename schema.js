const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stark').
then(()=> console.log("connect to mongodb ")).
catch(err => console.error("dont connect to mongodb",err));

const userAccount={
	name:"sunil bombe",
	author:"sunilbombe@gmail.com",
	tag:["ganesh","rahul"],
	isPublish: true  
};

const courseSchema = new mongoose.Schema({
		name: String,
		author: String,
		tag: [String],
		date: {type: Date, default: Date.now},
		isPublish: Boolean
	});

	const Course = mongoose.model('Course',courseSchema);

	async function createCourse(){
	const course = new Course(userAccount);

	const result = await course.save();
	};
	createCourse();


	const accountSchema = new mongoose.Schema({
	UserName : String,
    UserEmail : String,
    UserMobile : String,
    UserAddr : String,
    UserPwd : String,
});

 const UserAccount = mongoose.model('UserAccount',accountSchema);

 async function createUser(userData){
 	const fh_user = new UserAccount(userData);
 	const result = await fh_user.save();
 	console.log(result);
 };

  app.post('/signUpAccount',function(req,res){
  createUser(req.body);
  console.log('data is inserted');	
  });
