

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