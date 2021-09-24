const User=require('../models/user');

module.exports.admin=async function(req,res){
    try {
        if(!req.isAuthenticated()){
            console.log("you are not logged in");
            return res.redirect('/');
        }
        let users=await User.find({});
        return res.render('admin',{
            users
        })
    } catch (error) {
        console.log("error",error);  
    }
}

module.exports.assignWork= async function (req,res){
    
}