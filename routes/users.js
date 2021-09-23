const express=require("express");
const passport = require("passport");
const router=express.Router();
const userController=require('../controller/userController');

router.get('/login',userController.signIn);
router.get('/signup',userController.signUp);


router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);

module.exports=router;