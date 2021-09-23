const express=require("express");
const passport = require("passport");
const router=express.Router();

router.get('/',passport.checkAuthentication,)


module.exports=router;