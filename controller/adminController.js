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
        return; 
    }
}

module.exports.assignWork= async function (req,res){
   try {
       if(!req.isAuthenticated){
           console.log('please login')
           return res.redirect('/')
       }
       let recipient= await User.findById(req.body.recipient);
       let reviewer= await User.findById(req.body.reviewer);
       if(recipient == reviewer){
           return res.redirect('back');
       }
       recipient.from.push(reviewer);
       recipient.save();
       reviewer.for.push(recipient);
       reviewer.save();
       return res.redirect('back')

   } catch (error) {
       console.log("error",error);
       return;
   }
}

module.exports.allEmplyees= async function(req,res){
    if(!req.isAuthenticated){
        return res.redirect('/');
    }
    const users=await User.find({});
    return res.render('employee',{
        users
    });
}