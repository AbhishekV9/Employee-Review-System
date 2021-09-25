const express=require("express");
const passport = require("passport");
const router=express.Router();

const adminController=require('../controller/adminController');

router.get('/assignworks',adminController.admin);

router.post('/employee-task',adminController.assignWork);

router.get('/view_employees',adminController.allEmplyees);

module.exports=router;