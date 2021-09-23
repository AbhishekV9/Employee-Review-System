const express=require("express");
const passport = require("passport");
const router=express.Router();
const userController=require('../controller/userController');

router.get('/',passport.checkAuthentication,userController.home);

router.use('/users',require('./users'));

module.exports=router;