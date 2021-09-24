const User = require("../models/user");


module.exports.home=function(req,res){
    if(!req.user){
        res.redirect('users/login')
    }
    res.rendor('home');
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        console.log("already signed in");
        res.redirect('/');
    }
    res.render('login');
}

module.exports.createSession=function(req,res){
    console.log("signIn sucessfull");
    res.redirect('/')
}

module.exports.signUp=function(req,res){
    res.render('signup')
}

module.exports.createUser=async function(req,res){
    const {userName,email,password,confirmPassword}=req.body;
    const user=await User.findOne({email:email});
    if(user){
        console.log("user is already present");
        res.redirect('/users/login');
    }else{
        if(password !== confirmPassword){
            console.log("password mismatch");
            res.redirect('/users/signup');
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
                res.redirect('/users/signup')
            }
            res.redirect('/users/login')
        }
    }
    
}