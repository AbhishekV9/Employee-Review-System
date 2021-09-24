const express=require("express");
const passport = require("passport");
const router=express.Router();
const userController=require('../controller/userController');

router.get('/login',userController.logIn);
router.get('/signup',userController.signUp);
router.post('/createuser',userController.createUser);


router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/login'}
),userController.createSession);

module.exports=router;