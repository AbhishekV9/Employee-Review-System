const User = require("../models/user");
const Review=require('../models/review');


module.exports.home=async function(req,res){
  try {
    if(!req.user){
        return res.redirect('users/login')
     }
     let user=await User.findById(req.user._id);
     let recipients=[];
     for(let i=0 ;i<user.for.length;i++){
         let temp= await User.findById(user.for[i]);
         recipients.push(temp);
     }
     let review = await Review.find({
         for: req.user._id,
       });

     let recieved=[];
     for(let i=0;i<review.length;i++){
         let temp= await User.findById(review[i].from);
         
         let temp2={
             name:temp.name,
             review:review[i].review,
             updatedAt:review[i].updatedAt
         };
      
         recieved.push(temp2);
     }
    
     return res.render('home',{
         recipients,
         recieved
     });
  } catch (error) {
      console.log(error)
      return res.redirect('/')
  }
}

module.exports.logIn=function(req,res){
    if(!req.isAuthenticated()){
        return res.render('login');
    }
    console.log("already signed in 10");
    return res.redirect('/');
}

module.exports.createSession=function(req,res){
    console.log("signIn sucessfull");
    return res.redirect('/')
}

module.exports.signUp=function(req,res){
    return res.render('signup')
}

module.exports.createUser=async function(req,res){
    const {userName,email,password,confirmPassword}=req.body;
    const user=await User.findOne({email:email});
    if(user){
        console.log("user is already present");
        return res.redirect('/users/login');
    }else{
        if(password !== confirmPassword){
            console.log("password mismatch");
            return res.redirect('/users/signup');
        }else{
            const new_user= await User.create({
                name:userName,
                email,
                password,
                isAdmin:true
            });
            await new_user.save();
            console.log("user_created",new_user);
            if(!new_user){
                console.log("error in creating new user");
                return res.redirect('/users/signup')
            }
            return res.redirect('/users/login')
        }
    }
    
}

module.exports.signout=function(req,res){
    req.logout();
    console.log("logout");
    return res.redirect("/");
}