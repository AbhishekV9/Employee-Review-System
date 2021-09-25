const User=require('../models/user');
const Review=require('../models/review');

module.exports.createReview= async function(req,res){
  try {
    if(!req.isAuthenticated){
        return res.redirect('/');
    }
    
    let recipient= await User.findById(req.params.id);  
    let reviewer=req.user;
    let review=req.body.newReview;
    await Review.create({
        review,
        from:reviewer,
        for:recipient
    })
    // console.log("user",req.user);
    // console.log("recipient",recipient);
    return res.redirect('/');
      
  } catch (error) {
      console.log(error);
      return res.redirect('back')
  }


}